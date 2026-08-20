import { logger } from "@/lib/logger";

const REQUIRED_ENV_VARS = [
  "MONGODB_URI",
  "DATABASE_URL",
  "RESEND_API_KEY",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "CONTACT_EMAIL",
];

export function validateEnvironment(): { isValid: boolean; missing: string[] } {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    logger.warn({
      action: "ENV_VALIDATION",
      message: `Missing required environment variables: ${missing.join(", ")}`,
      metadata: { missing },
    });

    if (process.env.NODE_ENV === "development") {
      console.warn(`[DEV WARNING] Missing environment variables: ${missing.join(", ")}`);
    }

    return { isValid: false, missing };
  }

  return { isValid: true, missing: [] };
}
