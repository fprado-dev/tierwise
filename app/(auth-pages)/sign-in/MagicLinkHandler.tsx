// components/MagicLinkHandler.tsx
'use client';

import { createClient } from '@/utils/supabase/client'; // Create a client-side Supabase client
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MagicLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check if we have hash parameters in the URL
    if (window.location.hash && window.location.hash.includes('access_token')) {
      const supabase = createClient();
      // Handle the session from hash params
      supabase.auth.getSession().then(({ data }) => {

        if (data.session) {
          // Successfully authenticated, redirect to the dashboard
          router.push('/tiers');
        }
      });


      // Clean up the URL by removing the hash
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [router]);

  return null; // This component doesn't render anything
}
