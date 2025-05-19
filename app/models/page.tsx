"use client";

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import * as ModelServices from '@/lib/supabase/model.service';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ModelCard } from './components/model-card';
import { CreateModelModal } from './components/model-create-form';
import { ModelEmpty } from './components/model-empty';
import { ModelSkeleton } from './components/model-skeleton';
import { UpdateModelModal } from './components/model-update-form'; // Add this import
import { getCustomModels, getDefaultModels } from './helpers';

export default function ModelsPage() {
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: models, isLoading: isLoadingModels } = useQuery({
    queryKey: ['models'],
    queryFn: ModelServices.getDefaultModels,
  });

  // Create mutation
  const { isPending: isCreating, mutate: creatingModel } = useMutation({
    mutationFn: ModelServices.createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({ title: 'Model created successfully' });
      setOpenCreateModel(false);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Creation error',
        description: error.message,
      });
    }
  });

  // Update mutation
  const { isPending: isUpdating, mutate: updatingModel } = useMutation({
    mutationFn: (updatedModel: Partial<Omit<ModelServices.CreateModelParams, "owner_id">>) =>
      ModelServices.updateModel(selectedModel?.id, updatedModel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({ title: 'Model updated successfully' });
      setOpenUpdateModel(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Update error',
        description: "Erro while updating model",
      });
    }
  });

  // Delete mutation
  const { isPending: isDeleting, mutate: deletingModel } = useMutation({
    mutationFn: ModelServices.deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast({ title: 'Model deleted successfully' });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Deletion error',
        description: "Error while deleting model",
      });
    }
  });

  const customModels = getCustomModels(models);
  const defaultModels = getDefaultModels(models);

  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    setOpenUpdateModel(true);
  };

  const handleDeleteModel = (modelId: string) => {
    deletingModel(modelId);
  };

  const actions = {
    isDeleting,
    onEdit: handleEditModel, // Updated to use handleEditModel
    onDelete: handleDeleteModel
  };

  return (
    <div className="w-full">
      <div className="space-y-2 p-4 text-brand">
        <h1 className="text-3xl font-bold">AI Models</h1>
        <p className="text-muted-foreground">Manage and customize your AI models for cost tracking.</p>
      </div>

      <div className='px-4'>
        {/* Your Models Section */}
        <div className='flex flex-col'>
          <div className='flex gap-4 items-center my-4'>
            <div className='bg-brand/20 px-4 py-2 rounded-md w-4 h-full' />
            <h2 className='text-brand font-semibold text-center'>Your Models</h2>
            <Button
              className='bg-brand/20 hover:bg-brand/40'
              onClick={() => setOpenCreateModel(true)}
            >
              <PlusIcon className='h-6 w-6 text-brand' />
            </Button>
          </div>

          {!isLoadingModels && customModels.length <= 0 && (
            <ModelEmpty onCreateModel={() => setOpenCreateModel(true)} />
          )}

          {isLoadingModels && <ModelSkeleton title='Models' />}

          {isCreating ? <ModelSkeleton title='Models' /> : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {customModels.map((customModel) => (
                <ModelCard
                  key={customModel.id}
                  model={customModel}
                  {...actions}
                />
              ))}
            </div>
          )

          }
        </div>

        <Separator className='my-6 bg-brand/10' />

        {/* Default Models Section */}
        <div className='flex flex-col'>
          <div className='flex gap-4 items-center my-4'>
            <div className='bg-brand/20 px-4 py-2 rounded-md w-4 h-full' />
            <h2 className='text-brand font-semibold text-center'> TierWise Models</h2>
          </div>

          {isLoadingModels && <ModelSkeleton title='Models' />}

          {isCreating ? <ModelSkeleton title='Models' /> : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {defaultModels.map((defaultModel) => (
                <ModelCard
                  key={defaultModel.id}
                  model={defaultModel}
                  {...actions}
                  isDefault
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Model Modal */}
      <CreateModelModal
        open={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        onSubmit={creatingModel}
        isLoading={isCreating}
      />

      {/* Update Model Modal */}
      <UpdateModelModal
        open={openUpdateModel}
        onClose={() => {
          setOpenUpdateModel(false);
          setSelectedModel(null);
        }}
        onSubmit={updatingModel}
        isLoading={isUpdating}
        initialValues={selectedModel}
      />
    </div>
  );
}
