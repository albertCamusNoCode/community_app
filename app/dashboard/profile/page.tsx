import ProfileForm from "@/components/profile-form";

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
}

async function getUser(): Promise<User> {
  // TODO: Implement actual user data fetching
  // This is a mock implementation
  return {
    id: "1",
    email: "user@example.com",
    username: "johndoe",
    avatarUrl: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
  };
}

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="container mx-auto px-4 py-8" data-oid="x2.hrfe">
      <h1 className="text-3xl font-bold mb-6" data-oid=":k66g_d">
        Profile Management
      </h1>
      <ProfileForm user={user} data-oid="gcpjic7" />
    </div>
  );
}
