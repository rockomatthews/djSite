import { NextResponse } from "next/server";

const REQUIRED_FIELDS = ["name", "email", "eventDate", "eventDetails"] as const;

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventDetails: string;
};

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Missing Resend environment variables.");
  }

  const html = `
    <h2>New DJ Inquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
    <p><strong>Event Date:</strong> ${payload.eventDate}</p>
    <p><strong>Event Details:</strong></p>
    <p>${payload.eventDetails.replace(/\n/g, "<br/>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New DJ inquiry from ${payload.name}`,
      reply_to: payload.email,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    for (const field of REQUIRED_FIELDS) {
      if (!payload[field] || String(payload[field]).trim() === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await sendEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
