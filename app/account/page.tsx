"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { userService } from "@/lib/supabase/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

export default function AccountPage() {
  const [fullName, setFullName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: userService.getProfile
  });

  // Set fullName when profile data is available
  React.useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: userService.updateProfile,
    onSettled: (data, error) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update profile",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    }
  });

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const publicUrl = await userService.uploadAvatar(file);
      await updateProfile({ avatar_url: publicUrl });
      return publicUrl;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload avatar",
      });
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    uploadAvatar(event.target.files[0]);
  };

  const handleUpdateProfile = () => {
    updateProfile({ full_name: fullName });
  };

  const { mutateAsync: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      // Clear all queries from the cache
      queryClient.clear();

      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });

      // Redirect to home page
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account. Please try again.",
      });
    },
  });

  const { plan, isLoading: isLoadingSubscription } = useSubscription();

  const isLoading = isLoadingProfile || isUpdating || isUploading || isDeleting || isLoadingSubscription;

  if (!profile) return null;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile details and avatar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback>{profile.full_name?.charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar" className="cursor-pointer inline-block">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Change Avatar</span>
                  </Button>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isLoading}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleUpdateProfile}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Your current plan and usage information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{plan === 'PRO' ? 'Pro Plan' : 'Free Plan'}</h3>
                <p className="text-sm text-muted-foreground">{plan === 'PRO' ? 'Full access to all features' : 'Basic features'}</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/upgrade">
                  Manage Plan
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{plan === 'PRO' ? '5' : '1'}</div>
                    <p className="text-xs text-muted-foreground">Available projects</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Tiers per Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{plan === 'PRO' ? '5' : '2'}</div>
                    <p className="text-xs text-muted-foreground">Available tiers per project</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
      <Separator className="my-8" />

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove all of your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={async () => await deleteAccount()}
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}