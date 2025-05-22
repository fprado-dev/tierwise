"use client";

import { toast } from "@/hooks/use-toast";
import { Model } from "@/lib/supabase/model.service";
import * as TierServices from "@/lib/supabase/tier.services";
import { ProcessedTier } from "@/lib/tier.types";
import { mainQueryClient } from "@/providers/projects-provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TierCard } from "./components/tier-card";
import { TierCreationSheet } from "./components/tier-creation-sheet";
import { TiersNavigation } from "./components/tier-navigation";
import { TiersEmpty } from "./components/tiers-empty";

const TIERS_QUERY_KEY = ['tiers'];

export default function TiersPage() {
  const queryClient = useQueryClient(mainQueryClient);
  const { data: tiers, isLoading: isLoadingTiers } = useQuery({
    queryKey: TIERS_QUERY_KEY,
    queryFn: TierServices.getTiers,
  });

  // Proper mutation with optimistic updates
  const { isPending: isCreatingTier, mutate } = useMutation({
    mutationKey: ['addTier'],
    mutationFn: async (params: { name: string; inheritModels?: boolean; }) => {
      const { name, inheritModels } = params;
      const newTier = await TierServices.createTier(name);

      if (inheritModels) {
        const currentTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);
        const lastTier = currentTiers?.[currentTiers.length - 1];

        if (lastTier?.models.length) {
          await TierServices.addModelsToTier({
            tierId: newTier.id,
            modelIds: lastTier.models.map(m => m.id)
          });
        }
      }

      return newTier;
    },
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: TIERS_QUERY_KEY });

      const previousTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);
      const currentTiers = previousTiers || [];

      const optimisticTier: ProcessedTier = {
        id: `temp-${Date.now()}`,
        project_id: 'optimistic',
        user_id: 'optimistic',
        isActive: false,
        name: params.name,
        created_at: new Date().toISOString(),
        models: params.inheritModels && currentTiers.length > 0
          ? [...currentTiers[currentTiers.length - 1].models]
          : [],
      };

      queryClient.setQueryData(TIERS_QUERY_KEY,
        (old: ProcessedTier[]) => old ? [optimisticTier, ...old,] : [optimisticTier]
      );

      return { previousTiers };
    },
    onSuccess: (newTier) => {

      // Replace optimistic tier with real data
      queryClient.setQueryData<ProcessedTier[]>(TIERS_QUERY_KEY, old =>
        old?.map(tier => tier.id === `temp-${newTier.created_at}` ? { ...newTier, models: [] } : { ...tier, models: [] }) || []
      );
      toast({
        title: "Tier created successfully",
        description: "The tier has been created",
      });

    },
    onError: (error, _, context) => {
      toast({
        variant: "destructive",
        title: "Failed to create tier",
        description: error.message,
      });
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_QUERY_KEY, context.previousTiers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TIERS_QUERY_KEY });
    }

  });

  const handleCreateTier = (name: string, inheritModels?: boolean) => {
    mutate({ name, inheritModels });
  };

  // Update mutation
  const { isPending: isUpdatingTier, mutate: updateTier } = useMutation({
    mutationKey: ['updateTier'],
    mutationFn: async (tierToUpdate: { id: string; name?: string; isActive?: boolean; }) =>
      TierServices.updateTier(tierToUpdate),
    onMutate: async (updatedTier) => {
      await queryClient.cancelQueries({ queryKey: TIERS_QUERY_KEY });
      const previousTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);

      queryClient.setQueryData<ProcessedTier[]>(TIERS_QUERY_KEY, (old = []) =>
        old.map(tier =>
          tier.id === updatedTier.id
            ? { ...tier, ...updatedTier }  // Merge existing tier with updated fields
            : tier
        )
      );

      return { previousTiers };
    },
    onSuccess: (updatedTier, variables, context) => {
      // Replace the optimistic tier with the server response
      queryClient.setQueryData<ProcessedTier[]>(TIERS_QUERY_KEY, (old = []) =>
        old.map(tier =>
          tier.id === updatedTier.id
            ? {
              ...tier,
              ...updatedTier,

              // Explicitly maintain ProcessedTier structure
              models: tier.models || []  // Preserve existing models if not in response
            }
            : { ...tier, isActive: false }
        )
      );
      const previousTier = context?.previousTiers?.find(t => t.id === updatedTier.id);
      if (previousTier?.name !== updatedTier.name) {
        toast({
          title: "Tier updated successfully",
          description: "The tier name has been changed",
        });
      }
    },
  });

  const handleUpdateTier = (id: string, name?: string) => {
    updateTier({ id, name, isActive: true });
  };

  // Add models to tier mutation
  const { isPending: isAddingModelsToTier, mutate: addingModelsToTier } = useMutation({
    mutationFn: TierServices.addModelsToTier,
    onMutate: async ({ tierId, modelIds }) => {
      await queryClient.cancelQueries({
        queryKey: TIERS_QUERY_KEY
      });

      const previousTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);
      const allModels = queryClient.getQueryData<Model[]>(['models']);

      const modelsToAdd = allModels?.filter(model =>
        modelIds.includes(model.id)
      ) || [];

      const optimisticTiers = previousTiers?.map(tier => {
        if (tier.id === tierId) {
          const existingIds = new Set(tier.models.map(m => m.id));
          const newModels = modelsToAdd.filter(m => !existingIds.has(m.id));
          return {
            ...tier,
            models: [...tier.models, ...newModels]
          };
        }
        return tier;
      });

      queryClient.setQueryData(TIERS_QUERY_KEY, optimisticTiers);
      return { previousTiers };
    },
    onSuccess: () => {
      toast({
        title: "Models added to tier",
        description: "Models have been added to the tier",
      });
    },
    onError: (err, vars, context) => {
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_QUERY_KEY, context.previousTiers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: TIERS_QUERY_KEY
      });
    }
  });

  // Remove models from tier mutation
  const { isPending: isRemovingModelsFromTier, mutate: removingModelsFromTier } = useMutation({
    mutationFn: TierServices.removeModelsFromTier,
    onMutate: async ({ tierId, modelIds }) => {
      await queryClient.cancelQueries({
        queryKey: TIERS_QUERY_KEY
      });

      const previousTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);

      const optimisticTiers = previousTiers?.map(tier => {
        if (tier.id === tierId) {
          return {
            ...tier,
            models: tier.models.filter(m => !modelIds.includes(m.id))
          };
        }
        return tier;
      });

      queryClient.setQueryData(TIERS_QUERY_KEY, optimisticTiers);
      return { previousTiers };
    },
    onSuccess: () => {
      toast({
        title: "Models removed from tier",
        description: "Models have been removed from the tier",
      });
    },
    onError: (err, vars, context) => {
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_QUERY_KEY, context.previousTiers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: TIERS_QUERY_KEY
      });
    }
  });

  const handleRemoveModelsFromTier = (tierId: string, modelIds: string[]) => {
    removingModelsFromTier({ tierId, modelIds });
  };
  const handleAddModelsToTier = (tierId: string, modelIds: string[]) => {
    addingModelsToTier({ tierId, modelIds });
  };

  const { isPending: isDeletingTier, mutate: deletingTier } = useMutation({
    mutationFn: async (tierId: string) => {
      await TierServices.deleteTier(tierId);
      return tierId; // Return tierId for optimistic updates
    },
    onMutate: async (tierId) => {
      await queryClient.cancelQueries({
        queryKey: TIERS_QUERY_KEY
      });

      const previousTiers = queryClient.getQueryData<ProcessedTier[]>(TIERS_QUERY_KEY);

      // Optimistically remove the tier
      queryClient.setQueryData<ProcessedTier[]>(TIERS_QUERY_KEY, (old = []) =>
        old.filter(tier => tier.id !== tierId)
      );

      return { previousTiers, deletedTierId: tierId };
    },
    onError: (error, tierId, context) => {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Failed to delete tier",
      });

      // Rollback to previous tiers
      if (context?.previousTiers) {
        queryClient.setQueryData(TIERS_QUERY_KEY, context.previousTiers);
      }
    },
    onSuccess: (tierId) => {
      toast({
        title: "Tier deleted successfully",
        description: "The tier and its associations have been removed",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: TIERS_QUERY_KEY
      });
    }
  });

  const handleDeleteTier = (tierId: string) => {
    deletingTier(tierId);
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="space-y-2 p-4 text-brand">
        <h1 className="text-3xl font-bold">Tier Builder</h1>
        <p className="text-muted-foreground">Create and manage tiers and pricing models</p>
      </div>

      <div className='px-4'>
        {!isLoadingTiers && tiers && tiers.length <= 0 && (
          <TiersEmpty onAddTier={handleCreateTier} />
        )}
        {isLoadingTiers && (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 animate-spin rounded-full border-4 border-t-transparent border-brand" />
          </div>
        )}

        <div className="py-4 flex items-center justify-start gap-2">
          <TiersNavigation onSelectTier={handleUpdateTier} tiers={tiers || []} />
          {tiers && tiers.length > 0 && <TierCreationSheet tiers={tiers || []} onAddTier={handleCreateTier} />}
        </div>

        {isCreatingTier || isUpdatingTier || isDeletingTier ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 animate-spin rounded-full border-4 border-t-transparent border-brand" />
          </div>
        ) : (
          <div>
            {tiers && tiers?.filter(tier => tier.isActive).map(tier => (
              <TierCard
                onRemoveModelsFromTier={handleRemoveModelsFromTier}
                onAddModelsToTier={handleAddModelsToTier}
                onUpdateTier={handleUpdateTier}
                onDeleteTier={handleDeleteTier}
                isLoading={isAddingModelsToTier || isRemovingModelsFromTier || isCreatingTier || isUpdatingTier || isDeletingTier}
                key={tier.id}
                tier={tier} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
