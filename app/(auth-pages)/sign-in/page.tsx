import { signInAction } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64" data-oid="ud0n2eu">
      <h1 className="text-2xl font-medium" data-oid="iiy6iv4">
        Sign in
      </h1>
      <p className="text-sm text-foreground" data-oid="uvti71_">
        Don't have an account?{" "}
        <Link
          className="text-foreground font-medium underline"
          href="/sign-up"
          data-oid="-2xze0g"
        >
          Sign up
        </Link>
      </p>
      <div
        className="flex flex-col gap-2 [&>input]:mb-3 mt-8"
        data-oid="_kltvu_"
      >
        <Label htmlFor="email" data-oid="cmw_ofk">
          Email
        </Label>
        <Input
          name="email"
          placeholder="you@example.com"
          required
          data-oid="ka3hmlb"
        />

        <div className="flex justify-between items-center" data-oid="6.bkz7-">
          <Label htmlFor="password" data-oid="re0bpu1">
            Password
          </Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
            data-oid="cn8-yj0"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
          data-oid=":jzvtjz"
        />

        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          data-oid="22syr1l"
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} data-oid="j-qo4e5" />
      </div>
    </form>
  );
}
