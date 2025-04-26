'use server';

import { createClient } from '@/utils/supabase/server';
import { TierSummary } from '../tier.types';
import { getActiveProject } from './project.service';

export async function saveTierSummary(summary: Omit<TierSummary, 'id' | 'created_at' | "project_id" | "user_id">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const activeProject = await getActiveProject();

  // Check if a summary already exists for this tier
  const { data: existingSummary } = await supabase
    .from('tier_summaries')
    .select('*')
    .eq('tier_id', summary.tier_id)
    .eq('user_id', user?.id)
    .single();

  let result;

  if (existingSummary) {
    // Update existing summary
    const { data, error } = await supabase
      .from('tier_summaries')
      .update({
        input_tokens: summary.input_tokens,
        output_tokens: summary.output_tokens,
        image_count: summary.image_count,
        video_seconds: summary.video_seconds,
        text_margin_percentage: summary.text_margin_percentage,
        image_margin_percentage: summary.image_margin_percentage,
        video_margin_percentage: summary.video_margin_percentage,
        text_use_expensive_model: summary.text_use_expensive_model,
        image_use_expensive_model: summary.image_use_expensive_model,
        video_use_expensive_model: summary.video_use_expensive_model,
        operational_overhead_percentage: summary.operational_overhead_percentage
      })
      .eq('id', existingSummary.id)
      .select('*')
      .single();

    if (error) throw error;
    result = data;
  } else {
    // Create new summary
    const { data, error } = await supabase
      .from('tier_summaries')
      .insert({
        ...summary,
        user_id: user?.id,
        project_id: activeProject?.id
      })
      .select('*')
      .single();

    if (error) throw error;
    result = data;
  }

  return result;
}

export async function getTierSummary(tierId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const activeProject = await getActiveProject();

  const { data, error } = await supabase
    .from('tier_summaries')
    .select('*')
    .eq('tier_id', tierId)
    .eq('user_id', user?.id)
    .eq('project_id', activeProject?.id)
    .single();

  if (error && error.code !== 'PGSQL_NOTIMP') {
    // PGSQL_NOTIMP is returned when no record is found
    throw error;
  }

  return data as TierSummary | null;
}