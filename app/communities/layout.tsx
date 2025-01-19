import { Sidebar } from '@/components/community/sidebar'
import { RightSidebar } from '@/components/community/right-sidebar'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <div className="fixed inset-y-0 flex w-64">
        <Sidebar />
      </div>
      <main className="flex-1 lg:pl-64 xl:pr-80">
        <div className="h-16 border-b bg-white lg:hidden" />
        {children}
      </main>
      <RightSidebar />
    </div>
  )
}
