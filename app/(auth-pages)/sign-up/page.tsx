import { signUpAction } from "@/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div
        className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4"
        data-oid="t6q:.6r"
      >
        <FormMessage message={searchParams} data-oid="1ooskw4" />
      </div>
    );
  }

  return (
    <>
      <form
        className="flex flex-col min-w-64 max-w-64 mx-auto"
        data-oid="1pcj7b."
      >
        <h1 className="text-2xl font-medium" data-oid="rjm2640">
          Sign up
        </h1>
        <p className="text-sm text text-foreground" data-oid="f90nh-8">
          Already have an account?{" "}
          <Link
            className="text-primary font-medium underline"
            href="/sign-in"
            data-oid="x1gg.v-"
          >
            Sign in
          </Link>
        </p>
        <div
          className="flex flex-col gap-2 [&>input]:mb-3 mt-8"
          data-oid="4rkxdu-"
        >
          <Label htmlFor="email" data-oid="p3pj:.8">
            Email
          </Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            data-oid="-z2jg6a"
          />

          <Label htmlFor="password" data-oid="ih91aac">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            data-oid="gdsg-49"
          />

          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            data-oid="dtyhh3z"
          >
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} data-oid="kbfh3tw" />
        </div>
      </form>
      <SmtpMessage data-oid="n9qh3l8" />
    </>
  );
}
