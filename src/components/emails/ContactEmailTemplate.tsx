interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
}

export function generateContactEmailHtml({
  name,
  email,
  subject,
  telegram,
  message,
}: ContactEmailProps): string {
  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 600px; margin: 40px auto; padding: 40px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Corporate Header -->
    <div style="border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 28px;">
      <span style="font-size: 12px; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 1px;">
        New Contact Submission
      </span>
      <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 6px 0 0 0;">
        [Portfolio Inquiry] ${escape(subject)}
      </h1>
      <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">
        From: <strong>${escape(name)}</strong> (${escape(email)})
      </p>
    </div>

    <!-- Metadata Section -->
    <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 28px; border-left: 4px solid #0284c7;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 120px;">Full Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${escape(name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email Address:</td>
            <td style="padding: 6px 0; color: #0284c7; font-weight: 600;">
              <a href="mailto:${escape(email)}" style="color: #0284c7; text-decoration: none;">${escape(email)}</a>
            </td>
          </tr>
          ${
            telegram
              ? `
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Telegram Handle:</td>
            <td style="padding: 6px 0; color: #0f172a; font-family: monospace;">${escape(telegram)}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject Line:</td>
            <td style="padding: 6px 0; color: #0f172a;">${escape(subject)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message Payload Container -->
    <div style="margin-bottom: 32px;">
      <h2 style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
        Message Body
      </h2>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${escape(message)}
      </div>
    </div>

    <!-- Corporate Footer -->
    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        This inquiry was sent via sothsokhomal.com notification engine.
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}
