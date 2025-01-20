import Link from "next/link";
import { AuthButton } from "./auth-button";
import { getUser } from "@/app/actions/auth";

export async function Header() {
  const user = await getUser();

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Community App</span>
        </Link>
        <AuthButton user={user} />
      </div>
    </header>
  );
}
