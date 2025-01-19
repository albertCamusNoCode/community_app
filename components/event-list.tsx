'use client'

import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import EventItem from '@/components/event-item'

interface Event {
  id: string
  title: string
  communityId: string
  communityName: string
  startTime: string
  endTime: string
  location: string
}

interface Community {
  id: string
  name: string
}

async function getEvents(): Promise<Event[]> {
  // TODO: Implement actual data fetching
  return [
    { id: '1', title: 'Tech Meetup', communityId: '1', communityName: 'Tech Enthusiasts', startTime: '2023-06-15T18:00:00', endTime: '2023-06-15T20:00:00', location: 'Online' },
    { id: '2', title: 'Book Discussion', communityId: '2', communityName: 'Book Club', startTime: '2023-06-15T19:00:00', endTime: '2023-06-15T21:00:00', location: 'Local Library' },
    { id: '3', title: 'Morning Yoga', communityId: '3', communityName: 'Fitness Fanatics', startTime: '2023-06-16T07:00:00', endTime: '2023-06-16T08:00:00', location: 'City Park' },
    { id: '4', title: 'Coding Workshop', communityId: '1', communityName: 'Tech Enthusiasts', startTime: '2023-06-16T14:00:00', endTime: '2023-06-16T16:00:00', location: 'Tech Hub' },
    { id: '5', title: 'Author Q&A', communityId: '2', communityName: 'Book Club', startTime: '2023-06-17T15:00:00', endTime: '2023-06-17T16:30:00', location: 'Bookstore' },
  ]
}

async function getCommunities(): Promise<Community[]> {
  // TODO: Implement actual data fetching
  return [
    { id: '1', name: 'Tech Enthusiasts' },
    { id: '2', name: 'Book Club' },
    { id: '3', name: 'Fitness Fanatics' },
  ]
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [communities, setCommunities] = useState<Community[]>([])
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      const [eventData, communityData] = await Promise.all([getEvents(), getCommunities()])
      setEvents(eventData)
      setCommunities(communityData)
    }
    fetchData()
  }, [])

  const filteredEvents = selectedCommunity === 'all'
    ? events
    : events.filter(event => event.communityId === selectedCommunity)

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const date = format(parseISO(event.startTime), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Communities</SelectItem>
            {communities.map(community => (
              <SelectItem key={community.id} value={community.id}>
                {community.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{format(parseISO(date), 'EEEE, MMMM d, yyyy')}</h2>
            <div className="space-y-2">
              {dayEvents.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

