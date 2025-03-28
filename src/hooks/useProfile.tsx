
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile');
      return null;
    }
  }

  return {
    profile,
    loading,
    updateProfile,
  };
}
