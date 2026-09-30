import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const data = await request.json();
  const { name, phone, email, passengers, date, vehicle, program } = data;

  if (!name || !email || !program) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone || "—"}`,
    `Email: ${email}`,
    `Passengers: ${passengers || "—"}`,
    `Departure date: ${date || "—"}`,
    `Preferred vehicle: ${vehicle || "Not sure — advise me"}`,
    "",
    "Travel program:",
    program,
  ];

  try {
    const { error } = await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL || "Bush to Bay Quotes <quotes@bushtobay.co.za>",
      to: "sales@bushtobay.co.za",
      replyTo: email,
      subject: `New quote request from ${name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send quote request." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote request failed:", err);
    return NextResponse.json(
      { error: "Failed to send quote request." },
      { status: 500 }
    );
  }
}
