"use client";

import { useState } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Video, User2, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/app/actions/use-toast";
import type { Event } from "./types";

export function EventItem({ event }: { event: Event }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement event registration
      setIsRegistered(true);
      toast({
        title: "Success",
        description: "You have registered for this event",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register for event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startDate = parseISO(event.start_time);
  const endDate = parseISO(event.end_time);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          {/* Event header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              {event.subtitle && (
                <p className="text-sm text-muted-foreground">{event.subtitle}</p>
              )}
            </div>
            <Button
              variant={isRegistered ? "secondary" : "default"}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isRegistered ? "Registered" : "Register"}
            </Button>
          </div>

          {/* Event details */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>
                {event.attendees || 0} {event.max_attendees && `/ ${event.max_attendees}`} attendees
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {event.is_virtual ? (
                <Video className="mr-2 h-4 w-4" />
              ) : (
                <User2 className="mr-2 h-4 w-4" />
              )}
              <span>{event.location}</span>
            </div>
          </div>

          {/* Event description */}
          <p className="text-sm">{event.description}</p>

          {/* Event time */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {format(startDate, "MMM d, yyyy 'at' h:mm a")}
              {" - "}
              {format(endDate, "h:mm a")}
            </div>
            <div>{formatDistanceToNow(startDate, { addSuffix: true })}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
