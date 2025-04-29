
import { createClient } from "@/utils/supabase/client";
import { createServiceClient } from "@/utils/supabase/service-client";


export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  email: string;
}

export interface UpdateProfileData {
  full_name?: string;
  avatar_url?: string;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const supabase = createClient();

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      full_name: user.user_metadata.full_name || "",
      avatar_url: user.user_metadata.avatar_url,
      email: user.email || "",
    };
  },

  async updateProfile(updates: UpdateProfileData): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      data: {
        ...updates,
        updated_at: new Date().toISOString(),
      },
    });
    if (error) throw error;
  },

  async uploadAvatar(file: File): Promise<string> {
    const supabase = createClient();

    const fileExt = file.name.split(".").pop();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const filePath = `private/${user.id}/${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteAccount(): Promise<void> {
    const supabase = createClient();
    const serviceClient = createServiceClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("User not found");

    // Delete all user's avatars
    const { data: files, error: listError } = await supabase.storage
      .from("avatars")
      .list(`private/${user.id}`);
    if (listError) throw listError;

    if (files && files.length > 0) {
      const filePaths = files.map(file => `private/${user.id}/${file.name}`);
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .remove(filePaths);
      if (storageError) throw storageError;
    }

    // Delete user's data from any related tables
    // Add more table cleanup here if needed

    // Delete the user's account using service role client
    const { error: deleteError } = await serviceClient.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;

    // Sign out the user
    await supabase.auth.signOut();
  },
};

