import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div
      className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4"
      data-oid="8gno0nn"
    >
      <InfoIcon size={16} className="mt-0.5" data-oid=":20if-9" />
      <div className="flex flex-col gap-1" data-oid="rv921ix">
        <small className="text-sm text-secondary-foreground" data-oid="beloq-n">
          <strong data-oid="m18k1x5"> Note:</strong> Emails are rate limited.
          Enable Custom SMTP to increase the rate limit.
        </small>
        <div data-oid="h3kic_s">
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
            data-oid=".hd_9gx"
          >
            Learn more <ArrowUpRight size={14} data-oid="ma:nvr0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
