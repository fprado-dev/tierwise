"use client";
import * as ModelServices from '@/lib/supabase/model.service';
import { CreateModelParams, Model } from '@/lib/supabase/model.service';
import { mainQueryClient } from '@/providers/projects-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useModels() {
  const queryClient = useQueryClient(mainQueryClient);

  const { data: models = [], isLoading: loading } = useQuery<Model[]>({
    queryKey: ['models'],
    queryFn: ModelServices.getModels
  });

  const { data: defaultModels = [], isLoading: loadingDefaults } = useQuery<Model[]>({
    queryKey: ['defaultModels'],
    queryFn: ModelServices.getDefaultModels
  });

  const createModelMutation = useMutation({
    mutationFn: (params: CreateModelParams) => ModelServices.createModel(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  const updateModelMutation = useMutation({
    mutationFn: ({ id, ...params }: { id: string; } & Partial<CreateModelParams>) =>
      ModelServices.updateModel(id, params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  const deleteModelMutation = useMutation({
    mutationFn: ModelServices.deleteModel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  return {
    models,
    defaultModels,
    loading: loading || loadingDefaults,
    createModel: createModelMutation.mutateAsync,
    updateModel: updateModelMutation.mutateAsync,
    deleteModel: deleteModelMutation.mutateAsync,
    createModelMutation,
    updateModelMutation,
    deleteModelMutation,
    refreshModels: () => queryClient.invalidateQueries({ queryKey: ['models'] }),
  };
}