"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventItem } from "./event-item";
import type { Event } from "./types";
import { getEvents } from "@/app/actions/events";
import { createClient } from "@/lib/supabase/client";

interface Community {
  id: string;
  name: string;
}

async function getCommunities(): Promise<Community[]> {
  const supabase = createClient();
  const { data: communities, error } = await supabase
    .from('communities')
    .select('id, name')
    .order('name');

  if (error) {
    console.error('Error fetching communities:', error);
    return [];
  }

  return communities || [];
}

export function EventList() {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      const data = await getCommunities();
      setCommunities(data);
      if (data.length > 0) {
        setSelectedCommunity(data[0].id);
      }
      setIsLoading(false);
    }
    loadCommunities();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      if (selectedCommunity) {
        setIsLoading(true);
        const data = await getEvents(selectedCommunity);
        setEvents(data);
        setIsLoading(false);
      }
    }
    loadEvents();
  }, [selectedCommunity]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select
          value={selectedCommunity}
          onValueChange={setSelectedCommunity}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select community" />
          </SelectTrigger>
          <SelectContent>
            {communities.map((community) => (
              <SelectItem key={community.id} value={community.id}>
                {community.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No upcoming events
            </p>
          ) : (
            events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
