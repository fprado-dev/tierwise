"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email) {
    return encodedRedirect("error", "/sign-in", "Email is required");
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
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


