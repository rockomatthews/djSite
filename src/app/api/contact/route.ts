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

async function sendPushover(payload: ContactPayload) {
  const token = process.env.PUSHOVER_APP_TOKEN;
  const user = process.env.PUSHOVER_USER_KEY;

  if (!token || !user) {
    throw new Error("Missing Pushover environment variables.");
  }

  const message = [
    "New DJ Inquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Event Date: ${payload.eventDate}`,
    `Details: ${payload.eventDetails}`,
  ].join("\n");

  const params = new URLSearchParams({
    token,
    user,
    title: "DJ Park City Inquiry",
    message,
  });

  const response = await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pushover error: ${errorText}`);
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

    await Promise.all([sendEmail(payload), sendPushover(payload)]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
