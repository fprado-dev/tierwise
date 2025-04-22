'use client';

import * as ProjectServices from '@/lib/supabase/project.service';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook for fetching projects data using React Query
 * Separates data fetching logic from mutations for better organization
 */
export function useProjectQueries() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: ProjectServices.getProjects,
  });

  return {
    projects,
    isLoading,
    isError,
    error,
  };
}