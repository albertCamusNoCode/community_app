import { resetPasswordAction } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      data-oid="_h83i4y"
    >
      <h1 className="text-2xl font-medium" data-oid="gi9-pm3">
        Reset password
      </h1>
      <p className="text-sm text-foreground/60" data-oid="rufsjq3">
        Please enter your new password below.
      </p>
      <Label htmlFor="password" data-oid="21txyyd">
        New password
      </Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
        data-oid="-phjq5t"
      />

      <Label htmlFor="confirmPassword" data-oid="2uktb60">
        Confirm password
      </Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
        data-oid="pf7-vq."
      />

      <SubmitButton formAction={resetPasswordAction} data-oid="rmvdhup">
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} data-oid="x5ufhbo" />
    </form>
  );
}
