import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center" data-oid="ijtt18b">
      <Badge variant={"outline"} className="font-normal" data-oid="2jn5qeb">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2" data-oid="yy:_acf">
        <Button
          asChild
          size="sm"
          variant={"outline"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
          data-oid="b.:v4l0"
        >
          <Link href="/sign-in" data-oid="xgfn4sv">
            Sign in
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={"default"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
          data-oid="9qiayo7"
        >
          <Link href="/sign-up" data-oid="32zmka6">
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
}
