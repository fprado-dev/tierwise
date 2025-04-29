"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleStripeCustomerPortal(): Promise<{ url: string; }> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke(
    'stripe-customer-portal'
  );
  if (error) throw error;
  return { url: data.url };
}


