'use client';

import * as TierServices from '@/lib/supabase/tier.services';
import { ProcessedTier } from '@/lib/tier.types';
import { mainQueryClient } from '@/providers/projects-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TIERS_QUERY_KEY = ['tiers'];

export function useTiers() {
  const queryClient = useQueryClient(mainQueryClient);
  const { data: tiers = [], isLoading, isFetching } = useQuery<ProcessedTier[]>({
    queryKey: TIERS_QUERY_KEY,
    queryFn: TierServices.getTiers,
  });

  const createTierMutation = useMutation({
    mutationKey: ['addTier'],
    mutationFn: TierServices.createTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const addTier = (name: string) => {
    createTierMutation.mutate(name);
  };

  const updateTierMutation = useMutation({
    mutationKey: ['updateTier'],
    mutationFn: ({ id, name }: { id: string; name: string; }) =>
      TierServices.updateTier(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const updateTier = (id: string, name: string) => {
    updateTierMutation.mutate({ id, name });
  };

  const deleteTierMutation = useMutation({
    mutationKey: ['deleteTier'],
    mutationFn: TierServices.deleteTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const deleteTier = (id: string) => {
    deleteTierMutation.mutate(id);
  };

  const addModelsToTierMutation = useMutation({
    mutationKey: ['addModelToTier'],
    mutationFn: ({ tierId, modelIds }: { tierId: string; modelIds: string[]; }) =>
      TierServices.addModelsToTier({
        modelIds,
        tierId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const addModelToTier = (tierId: string, modelIds: string[]) => {
    addModelsToTierMutation.mutate({ tierId, modelIds });
  };

  const removeModelFromTierMutation = useMutation({
    mutationKey: ['removeModelFromTier'],
    mutationFn: ({ tierId, modelIds }: { tierId: string; modelIds: string[]; }) =>
      TierServices.removeModelsFromTier({
        modelIds,
        tierId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const removeModelFromTier = (tierId: string, modelIds: string[]) => {
    removeModelFromTierMutation.mutate({ tierId, modelIds });
  };


  return {
    tiers,
    addTier,
    createTierMutation,
    addModelToTier,
    addModelsToTierMutation,
    removeModelFromTierMutation,
    updateTierMutation,
    deleteTierMutation,
    removeModelFromTier,
    updateTier,
    deleteTier,
    isLoading: isLoading,
    isFetching: isFetching
  };

}