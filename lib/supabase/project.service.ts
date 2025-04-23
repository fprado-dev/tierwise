"use server";

import { createClient } from '@/utils/supabase/server';

export interface Project {
  id: string;
  created_at: string;
  owner_id: string;
  name: string;
  isActive: boolean;
}


async function createProject(name: string): Promise<Project | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('projects')
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error.message);
      return null;
    }

    return data as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  try {
    const { data, error } = await supabase.from("/projects")
      .select('*')
      .eq('owner_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error.message);
      return [];
    }
    return data as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function updateProject(id: string, name: string, isActive?: boolean): Promise<Project | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  try {
    const updateData: { name: string; is_active?: boolean; } = { name };
    if (isActive !== undefined) {
      updateData.is_active = isActive;
    }
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .eq('owner_id', user?.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error.message);
      return null;
    }

    return data as Project;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

async function deleteProject(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();


  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('owner_id', user?.id);

    if (error) {
      console.error('Error deleting project:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

async function setProjectActive(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    // First, set all projects to inactive
    await supabase
      .from('projects')
      .update({ isActive: false })
      .eq('owner_id', user?.id);

    // Then, set the selected project to active
    const { data, error } = await supabase
      .from('projects')
      .update({ isActive: true })
      .eq('id', id)
      .eq('owner_id', user?.id)
      .select()
      .single();

    if (error) {
      console.error('Error setting project active:', error.message);
      return null;
    }

    return data as Project;
  } catch (error) {
    console.error('Error setting project active:', error);
    return null;
  }
}

export async function getActiveProject(): Promise<Project | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', user?.id)
      .eq('isActive', true)
      .single();
    if (error) {
      console.error('Error fetching active project:', error.message);
      return null;
    }
    return data as Project;
  } catch (error) {
    console.error('Error fetching active project:', error);
    return null;
  }
}
export {
  createProject, deleteProject, getProjects, setProjectActive, updateProject
};

