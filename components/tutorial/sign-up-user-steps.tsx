import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6" data-oid="7nl4db6">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls" data-oid="1ez9sq:">
          <p data-oid="autr-y3">It looks like this App is hosted on Vercel.</p>
          <p className="mt-4" data-oid="xgak.bn">
            This particular deployment is
            <span
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
              data-oid="m1sn3zr"
            >
              "{process.env.VERCEL_ENV}"
            </span>{" "}
            on
            <span
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
              data-oid="-j_6:7c"
            >
              https://{process.env.VERCEL_URL}
            </span>
            .
          </p>
          <p className="mt-4" data-oid="fwarb5e">
            You will need to{" "}
            <Link
              className="text-primary hover:text-foreground"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
              data-oid="2.dzv:a"
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>
          <ul className="mt-4" data-oid="6w3ho-7">
            <li data-oid="dy4hfdy">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid="o--9niv"
              >
                http://localhost:3000/**
              </span>
            </li>
            <li data-oid="jykql0.">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid="d:f0a5h"
              >
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li data-oid="dlxbs1r">
              -{" "}
              <span
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
                data-oid="0mn88rl"
              >
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(".vercel.app", "")}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                className="text-primary hover:text-foreground"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
                data-oid="ujcx0w1"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
            data-oid="p2s-e8a"
          >
            Redirect URLs Docs <ArrowUpRight size={14} data-oid="w3xrmyh" />
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user" data-oid="-uovtev">
        <p data-oid="0wulzy2">
          Head over to the{" "}
          <Link
            href="/sign-up"
            className="font-bold hover:underline text-foreground/80"
            data-oid="tpq521r"
          >
            Sign up
          </Link>{" "}
          page and sign up your first user. It's okay if this is just you for
          now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
