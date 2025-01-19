import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/nav/header";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Community App",
  description: "A community management application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className={inter.className}>
        {isHomePage && <Header />}
        <Toaster />
        <main className="container mx-auto px-4 py-8 h-[1082px] w-full ml-0 mr-0">
          {children}
        </main>
      </body>
    </html>
  );
}
