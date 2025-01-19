import { Sidebar } from '@/components/sidebar'
import { RightSidebar } from '@/components/right-sidebar'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 border-l border-r">{children}</main>
      <RightSidebar />
    </div>
  )
}

