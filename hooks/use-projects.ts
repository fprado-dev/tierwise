"use client";
import * as ProjectServices from '@/lib/supabase/project.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useProjects() {
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: loading } = useQuery({
    queryKey: ['projects'],
    queryFn: ProjectServices.getProjects
  });

  const createProjectMutation = useMutation({
    mutationFn: ProjectServices.createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, name, isActive }: { id: string; name: string; isActive?: boolean; }) =>
      ProjectServices.updateProject(id, name, isActive),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateSetActiveMutation = useMutation({
    mutationFn: ProjectServices.setProjectActive,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: ProjectServices.deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const createProject = async (name: string) => {
    return createProjectMutation.mutateAsync(name);
  };

  const updateProject = async (id: string, name: string, isActive?: boolean) => {
    return updateProjectMutation.mutateAsync({ id, name, isActive });
  };

  const deleteProject = async (id: string) => {
    return deleteProjectMutation.mutateAsync(id);
  };


  const onSetUserActive = async (projectId: string) => {
    return updateSetActiveMutation.mutateAsync(projectId);

  };


  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    onSetUserActive,
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
    refreshProjects: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  };
}