'use client';

import * as TierSummaryServices from '@/lib/supabase/tier_summary.services';
import { TierSummary } from '@/lib/tier.types';
import { mainQueryClient } from '@/providers/projects-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTierSummary(tierId: string) {
  const queryClient = useQueryClient(mainQueryClient);
  const summaryQueryKey = ['tier-summary', tierId];

  const { data: summary, isLoading, isFetching } = useQuery<TierSummary | null>({
    queryKey: summaryQueryKey,
    queryFn: () => TierSummaryServices.getTierSummary(tierId),
  });

  const saveSummaryMutation = useMutation({
    mutationKey: ['saveTierSummary', tierId],
    mutationFn: (summaryData: Omit<TierSummary, 'id' | 'created_at' | "project_id" | "user_id">) =>
      TierSummaryServices.saveTierSummary(summaryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: summaryQueryKey });
    },
  });

  const saveSummary = (summaryData: Omit<TierSummary, 'id' | 'created_at' | "project_id" | "user_id">) => {
    saveSummaryMutation.mutate(summaryData);
  };

  return {
    summary,
    isLoading,
    isFetching,
    saveSummary,
    isSaving: saveSummaryMutation.isPending,
  };
}