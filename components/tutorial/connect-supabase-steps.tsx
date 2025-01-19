import { TutorialStep } from "./tutorial-step";

export default function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6" data-oid="v8fmuy-">
      <TutorialStep title="Create Supabase project" data-oid="-a_oc21">
        <p data-oid="la1lmuq">
          Head over to{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
            data-oid="h4rst68"
          >
            database.new
          </a>{" "}
          and create a new Supabase project.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables" data-oid="8m9p5gp">
        <p data-oid="tyy.lg_">
          Rename the{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="g-tufmp"
          >
            .env.example
          </span>{" "}
          file in your Next.js app to{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="nk8bsyz"
          >
            .env.local
          </span>{" "}
          and populate with values from{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
            data-oid="4:4fu4z"
          >
            your Supabase project's API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep
        title="Restart your Next.js development server"
        data-oid="zs3fun8"
      >
        <p data-oid="ptaqks-">
          You may need to quit your Next.js development server and run{" "}
          <span
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border"
            data-oid="p558vn9"
          >
            npm run dev
          </span>{" "}
          again to load the new environment variables.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page" data-oid="q6-fp50">
        <p data-oid="ajj1o0n">
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </p>
      </TutorialStep>
    </ol>
  );
}
