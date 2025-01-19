"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthButtonProps {
  user: any | null;
}

export function AuthButton({ user }: AuthButtonProps) {
  return (
    <div className="flex gap-2">
      {user ? (
        <>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <form action={signOutAction}>
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </>
      ) : (
        <>
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
