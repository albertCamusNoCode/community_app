import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import type { Event } from "./types";

export function EventsCard({ events }: { events: Event[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => {
          const startDate = parseISO(event.start_time);
          return (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="text-center bg-gray-100 px-3 py-1 rounded">
                <div className="text-lg font-semibold">{format(startDate, 'd')}</div>
                <div className="text-xs text-gray-500">{format(startDate, 'MMM')}</div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {format(startDate, 'h:mm a')} • {event.location}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
