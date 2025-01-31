import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12" data-oid="cx6pr_q">
      <div className="w-full" data-oid="5pm1o.k">
        <div
          className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center"
          data-oid="odm-pw2"
        >
          <InfoIcon size="16" strokeWidth={2} data-oid="m4.a7lh" />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start" data-oid="gg-ur_j">
        <h2 className="font-bold text-2xl mb-4" data-oid="swujd3f">
          Your user details
        </h2>
        <pre
          className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto"
          data-oid="10_i55y"
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div data-oid=".ktuy4_">
        <h2 className="font-bold text-2xl mb-4" data-oid="zgw03vl">
          Next steps
        </h2>
      </div>
    </div>
  );
}
