export async function sendTelegramNotification({
  name,
  email,
  subject,
  telegram,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  telegram?: string;
  message: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram bot token or chat ID is missing in environment variables.");
    return { success: false, error: "Telegram credentials missing." };
  }

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Format message using HTML parse mode for clean escaping & formatting
  const formattedText = `
<b>🚀 NEW VISITOR MESSAGE RECEIVED!</b>

<b>👤 Name:</b> ${escapeHtml(name)}
<b>✉️ Email:</b> ${escapeHtml(email)}
<b>📌 Subject:</b> ${escapeHtml(subject || "Portfolio Contact Inquiry")}
${telegram ? `<b>📱 Telegram:</b> ${escapeHtml(telegram)}\n` : ""}
<b>💬 Message Body:</b>
${escapeHtml(message)}

<i>📅 Date: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" })}</i>
`.trim();

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedText,
        parse_mode: "HTML",
      }),
    });

    const json = await response.json();
    if (!response.ok || !json.ok) {
      console.error("Telegram API error:", json);
      return { success: false, error: json.description || "Failed to send Telegram message." };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Telegram Notification Exception:", error);
    return { success: false, error: error.message };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
