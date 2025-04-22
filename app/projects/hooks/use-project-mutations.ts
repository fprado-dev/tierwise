'use client';

import * as ProjectServices from '@/lib/supabase/project.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook for managing project mutations using React Query
 * Separates mutation logic from data fetching for better organization
 */
export function useProjectMutations() {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: ProjectServices.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string; }) =>
      ProjectServices.updateProject(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: ProjectServices.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
  };
}