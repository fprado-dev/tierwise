'use server';

import { createClient } from '@/utils/supabase/server';


export type ModelType = 'text' | 'image' | 'video' | 'audio' | 'hardware';

export interface Model {
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  model_type: ModelType;
  model_name: string;
  is_public: boolean;
  cost_per_image?: number;
  input_cost_per_million?: number;
  output_cost_per_million?: number;
  provider?: string;
  cost_per_second?: number;
  media_type?: string;
  price_per_sec?: number;
  price_per_hour?: number;
  gpu_count?: number;
  cpu_multiplier?: string;
  gpu_ram?: string;
  ram?: string;
  is_custom?: boolean;
}



export async function getDefaultModels() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: models, error } = await supabase.from('models_default')
    .select('*')
    .or(`is_custom.eq.false,and(is_custom.eq.true,owner_id.eq.${user?.id})`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return models;
}

export interface CreateModelParams {
  model_name: string;
  model_type: ModelType;
  is_public?: boolean;
  cost_per_image?: number;
  input_cost_per_million?: number;
  output_cost_per_million?: number;
  provider?: string;
  cost_per_second?: number;
  media_type?: string;
  price_per_sec?: number;
  price_per_hour?: number;
  gpu_count?: number;
  cpu_multiplier?: string;
  gpu_ram?: string;
  ram?: string;
  is_custom?: boolean;
}

export async function createModel(params: CreateModelParams) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const newModel: CreateModelParams & { owner_id: string; } = {
    ...params,
    owner_id: user?.id!,
    is_custom: true,
  };
  const { data, error } = await supabase
    .from('models_default')
    .insert([newModel])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateModel(id: string, params: Partial<Omit<CreateModelParams, "owner_id">>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('models_default')
    .update(params)
    .eq('id', id)
    .eq('is_custom', true)
    .eq('owner_id', user?.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteModel(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('models_default')

    .delete()
    .eq('id', id)
    .eq('is_custom', true)
    .eq('owner_id', user?.id);

  if (error) throw error;
}