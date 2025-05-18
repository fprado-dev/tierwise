"use server";

import { createClient, } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { encodedRedirect } from "@/utils/utils";
import { revalidatePath } from "next/cache";


export const signupAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const companyName = formData.get("companyName") as string;

  const supabaseAdmin = createServiceClient();
  const supabase = await createClient();

  if (!email || !password || !fullName || !companyName) {
    return encodedRedirect("error", "/sign-up", "All fields are required");
  }

  try {
    // 1. Create user with admin API
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        company_name: companyName
      }
    });

    if (createError) {
      return encodedRedirect("error", "/sign-up", "User Already Exists");
    }

    // 2. Sign in the user directly
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      return encodedRedirect("error", "/sign-up", signInError.message);
    }

    // 3. Redirect to protected page
    return encodedRedirect(
      "success",
      "/tiers?success=true",
      "Account created! Welcome to TierWise."
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create account";
    return encodedRedirect("error", "/sign-up", errorMessage);
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect("error", "/sign-in", "Email and password are required");
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return encodedRedirect("error", "/sign-in", "Invalid credentials");
    }

    return encodedRedirect(
      "success",
      "/tiers",
      "Welcome back! You are now signed in."
    );
  } catch (error) {
    console.error("SignIn error:", error);
    return encodedRedirect(
      "error",
      "/sign-in",
      "Failed to sign in"
    );
  }
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




