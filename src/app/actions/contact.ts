"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkRateLimit } from "@/lib/rateLimit";
import { validateEnvironment } from "@/lib/envCheck";
import { logger } from "@/lib/logger";
import { sendMultiChannelNotifications } from "@/services/notificationService";

// Strict Email Regex pattern matching production standards
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Zod Validation Schema with XSS HTML string sanitization
const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters")
    .transform((val) => sanitizeInput(val)),
  email: z
    .string()
    .email("Invalid email format")
    .regex(EMAIL_REGEX, "Please provide a valid email address (e.g. name@domain.com)")
    .transform((val) => val.trim().toLowerCase()),
  subject: z
    .string()
    .max(150, "Subject cannot exceed 150 characters")
    .optional()
    .transform((val) => sanitizeInput(val || "Portfolio Contact Inquiry")),
  telegram: z
    .string()
    .max(50, "Telegram handle cannot exceed 50 characters")
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(3000, "Message payload cannot exceed 3000 characters")
    .transform((val) => sanitizeInput(val)),
  website_hp: z.string().optional(), // Honeypot field for bot protection
});

function sanitizeInput(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export async function submitContactFormAction(formData: {
  name: string;
  email: string;
  subject?: string;
  telegram?: string;
  message: string;
  website_hp?: string;
}) {
  const reqHeaders = headers();
  const forwardedFor = reqHeaders.get("x-forwarded-for");
  const realIp = reqHeaders.get("x-real-ip");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

  logger.info({
    action: "CONTACT_SUBMISSION_ATTEMPT",
    message: `Received contact form submission attempt from IP: ${clientIp}`,
    metadata: { ip: clientIp, email: formData.email },
  });

  // 1. Honeypot Bot Detection
  if (formData.website_hp && formData.website_hp.trim().length > 0) {
    logger.warn({
      action: "BOT_HONEYPOT_TRIGGERED",
      message: `Honeypot filled by bot from IP: ${clientIp}`,
      metadata: { ip: clientIp, honeypotValue: formData.website_hp },
    });
    // Silent deception for bots
    return {
      success: true,
      message: "Thank you! Your message has been received.",
    };
  }

  // 2. Rate Limiting Check (3 messages / hour / IP)
  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.success) {
    logger.warn({
      action: "RATE_LIMIT_EXCEEDED",
      message: `IP ${clientIp} exceeded rate limit of 3 submissions per hour.`,
      metadata: { ip: clientIp, resetMs: rateLimitResult.resetMs },
    });
    return {
      success: false,
      error: "Rate limit exceeded: You can send a maximum of 3 messages per hour. Please try again later.",
    };
  }

  // 3. Environment Variable Safety Check
  validateEnvironment();

  // 4. Input Validation & Sanitization with Zod
  const validation = ContactSchema.safeParse(formData);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || "Invalid input data.";
    logger.warn({
      action: "VALIDATION_FAILURE",
      message: `Zod validation failed: ${errorMsg}`,
      metadata: { errors: validation.error.errors },
    });
    return { success: false, error: errorMsg };
  }

  const sanitized = validation.data;

  // 5. Database Preservation Guarantee (Save to MongoDB FIRST)
  let savedMessage;
  try {
    savedMessage = await prisma.message.create({
      data: {
        name: sanitized.name,
        email: sanitized.email,
        subject: sanitized.subject || "Portfolio Contact Inquiry",
        telegram: sanitized.telegram || null,
        message: sanitized.message,
      },
    });

    logger.info({
      action: "DATABASE_PRESERVED",
      message: `Successfully saved visitor message to MongoDB Atlas with ID: ${savedMessage.id}`,
      metadata: { messageId: savedMessage.id, email: sanitized.email },
    });
  } catch (dbError: any) {
    logger.error({
      action: "DATABASE_ERROR",
      message: "Failed to persist contact message in MongoDB.",
      error: dbError,
    });
    return {
      success: false,
      error: "Database storage error. Please try again shortly.",
    };
  }

  // 6. Decoupled Multi-Channel Notification Dispatch
  try {
    await sendMultiChannelNotifications({
      name: sanitized.name,
      email: sanitized.email,
      subject: sanitized.subject || "Portfolio Contact Inquiry",
      telegram: sanitized.telegram,
      message: sanitized.message,
    });
  } catch (notifErr: any) {
    logger.error({
      action: "NOTIFICATION_DISPATCH_EXCEPTION",
      message: "Exception occurred during background notification dispatch.",
      error: notifErr,
    });
  }

  revalidatePath("/admin/messages");

  // 7. Enterprise Fail-Safe Return to User
  return {
    success: true,
    message: "Thank you! Your message has been sent successfully to Soth Sokhomal.",
    data: savedMessage,
  };
}
