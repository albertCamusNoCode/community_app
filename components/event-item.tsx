'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { ClockIcon, MapPinIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

interface Event {
  id: string
  title: string
  communityId: string
  communityName: string
  startTime: string
  endTime: string
  location: string
}

export default function EventItem({ event }: { event: Event }) {
  const [isGoing, setIsGoing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRSVP = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual RSVP API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      setIsGoing(!isGoing)
      toast({
        title: 'RSVP Updated',
        description: isGoing ? 'You are no longer attending this event.' : `You are now attending "${event.title}"`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update RSVP. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[16px_1fr] gap-x-2 gap-y-1 text-sm">
          <ClockIcon className="w-4 h-4" />
          <span>
            {format(parseISO(event.startTime), 'h:mm a')} - {format(parseISO(event.endTime), 'h:mm a')}
          </span>
          <MapPinIcon className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <div className="mt-2">
          <Badge variant="secondary">{event.communityName}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={isGoing ? 'default' : 'outline'}
          onClick={handleRSVP}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Updating...' : (isGoing ? 'Cancel RSVP' : 'RSVP')}
        </Button>
      </CardFooter>
    </Card>
  )
}

