"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventItem from "@/components/event-item";

interface Event {
  id: string;
  title: string;
  subtitle?: string;
  communityName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  host: string;
  attendees: number;
  coverImage?: string;
  tags?: string[];
}

interface Community {
  id: string;
  name: string;
}

async function getEvents(): Promise<Event[]> {
  // TODO: Implement actual data fetching
  return [
    {
      id: "1",
      title: "Mindful Mornings",
      subtitle: "Sunrise Meditation Series",
      communityName: "Meditation Series",
      description:
        "Join us for a transformative series of early morning meditation sessions designed to start your day with peace and intention. We invite you to connect with the tranquil energy...",
      startTime: "2024-02-02T13:00:00Z",
      endTime: "2024-02-02T14:00:00Z",
      location: "Online",
      host: "Mathilde Leo",
      attendees: 42,
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-egGFpbNb3nZu6g7pCjeuCtgrlOWevj.png",
      tags: ["Start clear", "Elevate your day"],
    },
    {
      id: "2",
      title: "Evening Flow",
      subtitle: "Yoga & Meditation",
      communityName: "Wellness Series",
      description:
        "End your day with a calming session of yoga and meditation, designed to help you unwind and prepare for restful sleep.",
      startTime: "2024-02-03T00:00:00Z",
      endTime: "2024-02-03T01:00:00Z",
      location: "Online",
      host: "Sarah Chen",
      attendees: 35,
      tags: ["Unwind", "Find peace"],
    },
  ];
}

async function getCommunities(): Promise<Community[]> {
  // TODO: Implement actual data fetching
  return [
    { id: "1", name: "Meditation Series" },
    { id: "2", name: "Wellness Series" },
  ];
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      const [eventData, communityData] = await Promise.all([
        getEvents(),
        getCommunities(),
      ]);
      setEvents(eventData);
      setCommunities(communityData);
    };
    fetchData();
  }, []);

  const filteredEvents =
    selectedCommunity === "all"
      ? events
      : events.filter((event) => event.communityName === selectedCommunity);

  return (
    <div className="space-y-6" data-oid="rjznoij">
      <div className="flex justify-between items-center" data-oid="ths:zh5">
        <h2 className="text-2xl font-bold" data-oid="af3k-cp">
          Next event
        </h2>
        <Select
          value={selectedCommunity}
          onValueChange={setSelectedCommunity}
          data-oid="z9f6q:6"
        >
          <SelectTrigger className="w-[200px]" data-oid="0:rvyo2">
            <SelectValue placeholder="Filter by Series" data-oid="af8rw4t" />
          </SelectTrigger>
          <SelectContent data-oid=":orcu:8">
            <SelectItem value="all" data-oid="o69gmf.">
              All Series
            </SelectItem>
            {communities.map((community) => (
              <SelectItem
                key={community.id}
                value={community.name}
                data-oid="xo4j9-y"
              >
                {community.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="pr-4" data-oid="rtyms-i">
        <div className="space-y-6" data-oid="pkihwen">
          {filteredEvents.map((event) => (
            <EventItem key={event.id} event={event} data-oid="u00r7wp" />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
