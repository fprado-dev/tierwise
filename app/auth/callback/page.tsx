'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const handleAuth = async () => {
      try {
        const supabase = createClient();

        // First check if there's already a session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/tiers');
          return;
        }

        // If hash exists, process it
        if (window.location.hash && window.location.hash.includes('access_token')) {

          // Set the session from hash - this is crucial
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1) // Remove the # character
          );

          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken && refreshToken) {
            // Explicitly set the session with the tokens
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (error) throw error;

            // Verify the session was established
            const { data: sessionData } = await supabase.auth.getSession();

            if (sessionData.session) {
              router.push('/tiers');
            } else {
              throw new Error('Failed to establish session after setting tokens');
            }
          } else {
            throw new Error('Missing tokens in hash parameters');
          }
        } else {
          router.push('/sign-in?error=No+authentication+parameters');
        }
      } catch (error: any) {
        console.error('Authentication error:', error);
        router.push('/sign-in?error=' + encodeURIComponent(error.message || 'Authentication failed'));
      }
    };

    // Add a small delay to ensure browser has fully processed the URL
    setTimeout(handleAuth, 1000);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Signing you in...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
