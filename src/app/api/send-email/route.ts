import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const emailHtml = React.createElement(EmailTemplate, {
      firstName: "Ammar",
    }); // Create the React element.

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From Sleem Tech",
      react: emailHtml,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
