import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'
import BottomNav from '@/components/bottom-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Community App',
  description: 'A community management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-8 mb-16">
          {children}
        </main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  )
}

