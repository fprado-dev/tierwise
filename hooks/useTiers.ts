'use client';

import * as TierServices from '@/lib/supabase/tier.services';
import { ProcessedTier } from '@/lib/tier.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TIERS_QUERY_KEY = ['tiers'];

export function useTiers() {
  const queryClient = useQueryClient();
  const { data: tiers = [], isLoading } = useQuery<ProcessedTier[]>({
    queryKey: TIERS_QUERY_KEY,
    queryFn: TierServices.getTiers,
  });

  const { mutate: addTier } = useMutation({
    mutationFn: TierServices.createTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const { mutate: updateTier } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string; }) =>
      TierServices.updateTier(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const { mutate: deleteTier } = useMutation({
    mutationFn: TierServices.deleteTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const { mutate: addModelToTier } = useMutation({
    mutationFn: ({ tierId, modelIds }: { tierId: string; modelIds: string[]; }) =>
      TierServices.addModelsToTier({
        modelIds,
        tierId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  const { mutate: removeModelFromTier } = useMutation({
    mutationFn: ({ tierId, modelIds }: { tierId: string; modelIds: string[]; }) =>
      TierServices.removeModelsFromTier({
        modelIds,
        tierId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    },
  });

  return {
    tiers,
    addTier,
    addModelToTier,
    removeModelFromTier,
    updateTier,
    deleteTier,
    isLoading,
  };

}