import { Suspense } from "react";
import EventList from "./event-list";
import EventListSkeleton from "./event-list-skeleton";

export default function EventsPage() {
  return (
    <div className="space-y-6" data-oid="0cha8vo">
      <h1 className="text-3xl font-bold" data-oid="6e1ss-8">
        Upcoming Events
      </h1>
      <Suspense
        fallback={<EventListSkeleton data-oid="nfvjz:o" />}
        data-oid="891ca0."
      >
        <EventList data-oid="ynbfrqo" />
      </Suspense>
    </div>
  );
}
