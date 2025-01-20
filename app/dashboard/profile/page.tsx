import { ProfileForm } from "./components/profile-form";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import type { User } from "./types";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user || !user.email) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      <ProfileForm user={user} />
    </div>
  );
}
