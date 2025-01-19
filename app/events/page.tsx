import { Suspense } from 'react'
import EventList from '@/components/event-list'
import EventListSkeleton from '@/components/event-list-skeleton'

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </div>
  )
}

