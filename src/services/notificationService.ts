import { Resend } from "resend";
import { sendTelegramNotification } from "@/lib/telegram";
import { generateContactEmailHtml } from "@/components/emails/ContactEmailTemplate";
import { logger } from "@/lib/logger";

const resendApiKey = process.env.RESEND_API_KEY || "re_VokksmZY_4zKwYef3U5XyVfi4ytg3gnbG";
const resend = new Resend(resendApiKey);

export interface NotificationPayload {
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
}

export async function sendMultiChannelNotifications(payload: NotificationPayload): Promise<{
  telegramSuccess: boolean;
  emailSuccess: boolean;
}> {
  let telegramSuccess = false;
  let emailSuccess = false;

  logger.info({
    action: "NOTIFICATION_DISPATCH_START",
    message: `Starting multi-channel notification dispatch for ${payload.email}`,
    metadata: { sender: payload.email, name: payload.name },
  });

  const emailHtml = generateContactEmailHtml({
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    telegram: payload.telegram,
    message: payload.message,
  });

  // Enterprise Subject Line Format: [Portfolio Inquiry] {subject} | From: {name}
  const emailSubject = `[Portfolio Inquiry] ${payload.subject} | From: ${payload.name}`;

  const results = await Promise.allSettled([
    // 1. Dispatch Telegram Alert
    sendTelegramNotification({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      telegram: payload.telegram,
      message: payload.message,
    }),

    // 2. Dispatch Resend Email Alert
    resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "soth.vannakrothchansokhomal@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
    }),
  ]);

  // Handle Telegram Result
  if (results[0].status === "fulfilled" && results[0].value.success) {
    telegramSuccess = true;
    logger.info({
      action: "TELEGRAM_SUCCESS",
      message: "Telegram bot message delivered successfully.",
    });
  } else {
    const err = results[0].status === "rejected" ? results[0].reason : (results[0].value as any)?.error;
    logger.error({
      action: "TELEGRAM_FAILURE",
      message: "Failed to dispatch Telegram bot notification.",
      error: err,
    });
  }

  // Handle Email Result
  if (results[1].status === "fulfilled" && !(results[1].value as any)?.error) {
    emailSuccess = true;
    logger.info({
      action: "EMAIL_SUCCESS",
      message: "Resend email delivered successfully.",
    });
  } else {
    const err = results[1].status === "rejected" ? results[1].reason : (results[1].value as any)?.error;
    logger.error({
      action: "EMAIL_FAILURE",
      message: "Failed to dispatch Resend email notification.",
      error: err,
    });
  }

  return { telegramSuccess, emailSuccess };
}
