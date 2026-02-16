import { NextResponse } from "next/server";

const REQUIRED_FIELDS = ["name", "email", "eventDate", "eventDetails"] as const;
const SMS_TO = "+14359010628";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventDetails: string;
};

async function sendSms(message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error("Missing Twilio environment variables.");
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const params = new URLSearchParams({
    To: SMS_TO,
    From: fromNumber,
    Body: message,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio error: ${errorText}`);
  }
}

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
    <p><strong>Phone:</strong> ${payload.phone ?? "Not provided"}</p>
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

    const smsMessage = [
      "New DJ Inquiry",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "Not provided"}`,
      `Event Date: ${payload.eventDate}`,
      `Details: ${payload.eventDetails}`,
    ].join("\n");

    await Promise.all([sendEmail(payload), sendSms(smsMessage)]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
