import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event } from "../types";

export function EventsCard({ events }: { events: Event[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-center bg-gray-100 px-3 py-1 rounded">
              <div className="text-lg font-semibold">{event.date}</div>
              <div className="text-xs text-gray-500">{event.month}</div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{event.title}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
