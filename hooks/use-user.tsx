// hooks/useUser.ts
'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useUser() {
  const queryClient = useQueryClient();
  const userQueryKey = ['auth', 'user'];

  // Check for success redirect after signup
  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const successMessage = searchParams.get('success');

    if (successMessage) {
      // Validate session when we have a success redirect
      queryClient.invalidateQueries({ queryKey: userQueryKey });

      // Clean up URL after validation
      searchParams.delete('success');
      const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [queryClient, userQueryKey]);

  // Auth state listener
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(userQueryKey, session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [queryClient, userQueryKey]);

  // User query
  const query = useQuery<User | null>({
    queryKey: userQueryKey,
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 60,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
