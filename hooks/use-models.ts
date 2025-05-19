"use client";

import * as ModelServices from '@/lib/supabase/model.service';
import { CreateModelParams, Model } from '@/lib/supabase/model.service';
import { mainQueryClient } from '@/providers/projects-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useModels() {
  const queryClient = useQueryClient(mainQueryClient);


  const { data: defaultModels = [], isLoading: loadingDefaults } = useQuery<Model[]>({
    queryKey: ['defaultModels'],
    queryFn: ModelServices.getDefaultModels
  });

  const createModelMutation = useMutation({
    mutationFn: (params: CreateModelParams) => ModelServices.createModel(params),
    onSuccess: async (data) => {

      await queryClient.invalidateQueries({ queryKey: ['defaultModels'] });
    },
  });

  const updateModelMutation = useMutation({
    mutationFn: ({ id, ...params }: { id: string; } & Partial<CreateModelParams>) =>
      ModelServices.updateModel(id, params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['defaultModels'] });
    },
  });

  const deleteModelMutation = useMutation({
    mutationFn: ModelServices.deleteModel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['defaultModels'] });
    },
  });

  return {
    defaultModels,
    loading: loadingDefaults,
    createModel: createModelMutation.mutate,
    updateModel: updateModelMutation.mutate,
    deleteModel: deleteModelMutation.mutate,
    createModelMutation,
    updateModelMutation,
    deleteModelMutation,
    refreshModels: () => queryClient.invalidateQueries({ queryKey: ['models'] }),
  };
}