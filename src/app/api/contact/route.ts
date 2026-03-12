import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const REQUIRED_FIELDS = ["name", "email", "eventDate", "eventDetails"] as const;

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventDetails: string;
};

async function sendEmail(payload: ContactPayload) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass || !toEmail) {
    throw new Error("Missing Gmail SMTP environment variables.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const text = [
    "New DJ Inquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Event Date: ${payload.eventDate}`,
    `Details: ${payload.eventDetails}`,
  ].join("\n");

  const html = `
    <h2>New DJ Inquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
    <p><strong>Event Date:</strong> ${payload.eventDate}</p>
    <p><strong>Event Details:</strong></p>
    <p>${payload.eventDetails.replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({
    from: `"DJ Park City" <${gmailUser}>`,
    to: toEmail,
    replyTo: payload.email,
    subject: `New DJ inquiry from ${payload.name}`,
    text,
    html,
  });
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
