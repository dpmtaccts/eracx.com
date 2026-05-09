export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, company, email, message } = req.body || {};

  if (!name || !company || !email) {
    return res.status(400).json({ error: "Missing required fields: name, company, email" });
  }

  const errors = [];

  // Send email via Resend.
  //
  // The `from` address must use a domain verified on the Resend dashboard
  // (Resend → Domains → eracx.com). The previous `onboarding@resend.dev`
  // is a sandbox-only sender that silently drops mail to non-verified
  // recipients, which is why hello@eracx.com wasn't receiving form
  // submissions. Setting `reply_to: email` so hitting reply on the
  // notification goes straight to the submitter, not to ERA's own inbox.
  if (process.env.RESEND_API_KEY) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ERA Contact Form <noreply@eracx.com>",
          to: "hello@eracx.com",
          reply_to: email,
          subject: `New ERA inquiry from ${name} at ${company}`,
          text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nMessage: ${message || "(none)"}`,
        }),
      });
      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        errors.push(`Resend error: ${errBody}`);
      }
    } catch (err) {
      errors.push(`Resend error: ${err.message}`);
    }
  }

  // Send Slack notification
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      const slackRes = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "New ERA inquiry",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New contact form submission*\n*Name:* ${name}\n*Company:* ${company}\n*Email:* ${email}\n*Message:* ${message || "(none)"}`,
              },
            },
          ],
        }),
      });
      if (!slackRes.ok) {
        errors.push("Slack webhook failed");
      }
    } catch (err) {
      errors.push(`Slack error: ${err.message}`);
    }
  }

  if (errors.length > 0 && !process.env.RESEND_API_KEY && !process.env.SLACK_WEBHOOK_URL) {
    return res.status(500).json({ error: "No notification services configured" });
  }

  return res.status(200).json({ ok: true });
}
