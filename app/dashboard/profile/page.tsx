import { ProfileForm } from "./components/profile-form";
import { getUser } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "./types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user || !user.email) {
    redirect("/auth/login");
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // Create profile if it doesn't exist
    const { error } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      throw error;
    }
  }

  const userData: User = {
    id: user.id,
    email: user.email,
    name: profile?.name || null,
    avatar_url: profile?.avatar_url || null,
    created_at: profile?.created_at || new Date().toISOString(),
    updated_at: profile?.updated_at || new Date().toISOString()
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      <ProfileForm user={userData} />
    </div>
  );
}
