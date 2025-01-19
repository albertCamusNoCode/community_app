import { notFound } from 'next/navigation'
import InviteAcceptance from '@/components/invite-acceptance'

interface InviteData {
  communityName: string
  inviterName: string
}

async function getInviteData(token: string): Promise<InviteData | null> {
  // TODO: Implement actual invite data fetching
  // This is a mock implementation
  if (token === 'invalid') return null

  return {
    communityName: 'Sample Community',
    inviterName: 'John Doe',
  }
}

export default async function InvitePage({ params }: { params: { token: string } }) {
  const inviteData = await getInviteData(params.token)

  if (!inviteData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Invitation</h1>
      <InviteAcceptance token={params.token} inviteData={inviteData} />
    </div>
  )
}

