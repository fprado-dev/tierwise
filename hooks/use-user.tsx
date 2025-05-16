// hooks/useUser.ts
'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useUser() {
  const queryClient = useQueryClient();

  // Create a query key for the user
  const userQueryKey = ['auth', 'user'];

  // Set up auth state change listener
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Update query data when auth state changes
        queryClient.setQueryData(userQueryKey, session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // Query for the current user
  const query = useQuery<User | null>({
    queryKey: userQueryKey,
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
    // Start with no stale time to ensure it's fresh on mount
    staleTime: 0,
    // After initial load, we can keep it for longer
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
