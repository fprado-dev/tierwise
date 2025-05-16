"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export interface SendEmailParams {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(params: SendEmailParams) {
  const { to, subject, html, from = 'TierWise <tierwise@tierwise.pro>' } = params;

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}