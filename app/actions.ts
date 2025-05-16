"use server";

import { sendEmail } from "@/lib/email/email.service";
import { createClient, } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { encodedRedirect } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";



export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createServiceClient();
  const origin = (await headers()).get("origin");

  if (!email) {
    return encodedRedirect("error", "/sign-in", "Email is required");
  }

  // Generate a magic link instead of sending it directly
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${origin}/auth/callback`,
    }
  });

  if (error) {
    console.error("Error generating magic link:", error);
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // The exact path to access the link depends on the response structure
  // You may need to adjust this after checking the actual response
  const actionLink = data.properties.action_link;

  if (!actionLink) {
    return encodedRedirect("error", "/sign-in", "Failed to generate magic link");
  }

  // Create HTML email template
  const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0d1b2a;">Sign in to TierWise</h1>
        <p>Click the button below to sign in to your account:</p>
        <a href="${actionLink}" style="display: inline-block; background-color: #0d1b2a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 15px 0;">
          Sign In
        </a>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          If you didn't request this link, you can safely ignore this email.
        </p>
      </div>
    `;

  // Send the email using Resend
  const emailResult = await sendEmail({
    from: `TierWise <tierwise@tierwise.pro>`,
    to: [email],
    subject: "Your Magic Link to Sign In to TierWise",
    html: htmlContent,
  });

  if (!emailResult.success) {
    console.error("Failed to send email:", emailResult.error);
    return encodedRedirect("error", "/sign-in", "Failed to send magic link email");
  }

  return encodedRedirect(
    "success",
    "/sign-in",
    "Check your email for the magic link to sign in."
  );

};

export async function signOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  revalidatePath("/", "layout");
  return encodedRedirect("success", "/", "Successfully signed out");
}


