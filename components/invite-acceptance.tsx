'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

interface InviteData {
  communityName: string
  inviterName: string
}

interface InviteAcceptanceProps {
  token: string
  inviteData: InviteData
}

export default function InviteAcceptance({ token, inviteData }: InviteAcceptanceProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAccept = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual invite acceptance logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: 'Invitation Accepted',
        description: `You have successfully joined ${inviteData.communityName}!`,
      })
      router.push(`/communities/${token}`) // Redirect to the community page
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept the invitation. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = () => {
    toast({
      title: 'Invitation Declined',
      description: 'You have declined the invitation.',
    })
    router.push('/') // Redirect to home page
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{inviteData.communityName}</CardTitle>
        <CardDescription>You've been invited by {inviteData.inviterName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Would you like to join this community?
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleDecline} disabled={isLoading}>
          Decline
        </Button>
        <Button onClick={handleAccept} disabled={isLoading}>
          {isLoading ? 'Accepting...' : 'Accept Invitation'}
        </Button>
      </CardFooter>
    </Card>
  )
}

