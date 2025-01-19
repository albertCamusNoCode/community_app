import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center" data-oid="ccrvenz">
      <div
        className="flex gap-8 justify-center items-center"
        data-oid="ug-f1t."
      >
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
          data-oid="2iyudkg"
        >
          <SupabaseLogo data-oid="gaprhrw" />
        </a>
        <span className="border-l rotate-45 h-6" data-oid="nf6wpp6" />
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
          data-oid="k5yq6ho"
        >
          <NextLogo data-oid="-wird:l" />
        </a>
      </div>
      <h1 className="sr-only" data-oid="kr33v_5">
        Supabase and Next.js Starter Template
      </h1>
      <p
        className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center"
        data-oid="6pc59a2"
      >
        The fastest way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
          data-oid="am2t83w"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
          data-oid="dn.ofyt"
        >
          Next.js
        </a>
      </p>
      <div
        className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"
        data-oid="e9h7_nv"
      />
    </div>
  );
}
