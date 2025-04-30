'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type SubscriptionTier = 'FREE' | 'PRO';

interface UserSubscription {
  id: string;
  created_at: string;
  plan: SubscriptionTier;
  stripe_customer_id: string;
}

export function useSubscription() {
  const [plan, setPlan] = useState<SubscriptionTier>('FREE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCurrentSubscription() {
      const supabase = createClient();

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Get the user's subscription
      const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('id', user.id)
        .single();

      if (subscription) {
        setPlan(subscription.plan);
      }

      setIsLoading(false);
    }

    getCurrentSubscription();
  }, []);

  return { plan, isLoading };
}