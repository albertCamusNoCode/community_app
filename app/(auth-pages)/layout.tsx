export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      data-oid=".ki_-0a"
    >
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
        data-oid="kkfl2ee"
      >
        <div className="absolute inset-0 bg-zinc-900" data-oid="i6zvbum" />
        <div
          className="relative z-20 flex items-center text-lg font-medium"
          data-oid="2q1jzjh"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
            data-oid="7-7pz6j"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
              data-oid="4de94-k"
            />
          </svg>
          Community App
        </div>
        <div className="relative z-20 mt-auto" data-oid="dma1m9b">
          <blockquote className="space-y-2" data-oid="kibpbm7">
            <p className="text-lg" data-oid="ym:t.25">
              Connect with your community, share events, and grow together.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8" data-oid="g1ro35w">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]"
          data-oid="14lukqn"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
