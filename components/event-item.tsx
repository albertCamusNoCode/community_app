"use client";

import { useState } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Video, User2, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/actions/use-toast";

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

export default function EventItem({ event }: { event: Event }) {
  const [isGoing, setIsGoing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRSVP = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsGoing(!isGoing);
      toast({
        title: "RSVP Updated",
        description: isGoing
          ? "You are no longer attending this event."
          : `You are now attending "${event.title}"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startDate = parseISO(event.startTime);
  const daysUntilStart = Math.ceil(
    (startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <Card className="overflow-hidden" data-oid="nptzos6">
      <div className="relative" data-oid="isn_6j:">
        <div
          className="aspect-[2/1] bg-purple-100 relative overflow-hidden"
          style={{
            backgroundImage: event.coverImage
              ? `url(${event.coverImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-oid=":5uorah"
        >
          <div
            className="absolute inset-0 bg-purple-500/10"
            data-oid="d5vke8f"
          />

          <div
            className="absolute inset-0 p-6 flex flex-col justify-between"
            data-oid=".qir2.g"
          >
            <div className="space-y-4" data-oid="61jnanc">
              <Badge
                variant="secondary"
                className="bg-white/90 text-purple-600 hover:bg-white/80"
                data-oid="rgy8m.n"
              >
                {event.communityName}
              </Badge>
              <div data-oid="gq30ejm">
                <h3
                  className="text-4xl font-bold text-gray-900"
                  data-oid="pzbl_30"
                >
                  {event.title}
                </h3>
                {event.subtitle && (
                  <p className="text-lg text-gray-700 mt-2" data-oid="x.1roxa">
                    {event.subtitle}
                  </p>
                )}
              </div>
            </div>
            {event.tags && (
              <div className="flex gap-2" data-oid="eya42_.">
                {event.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-full px-4 py-1 text-sm shadow-sm"
                    data-oid="htdc9t2"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CardContent className="p-6 space-y-6" data-oid="onk54yy">
        <div data-oid="bwp7.sn">
          <h4 className="text-xl font-semibold mb-2" data-oid="k6i7b6k">
            {format(parseISO(event.startTime), "EEEE, MMM do '@' h:mm a (zzz)")}
          </h4>
          <p className="text-gray-600" data-oid="6bnd:t1">
            {event.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3" data-oid="blp:5gx">
          {daysUntilStart > 0 && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
              data-oid="5z5ydp7"
            >
              Starts in {daysUntilStart} {daysUntilStart === 1 ? "day" : "days"}
            </Badge>
          )}
          <Badge
            variant="outline"
            className="bg-purple-50 border-purple-200"
            data-oid="b:yb1jm"
          >
            <Video className="w-4 h-4 mr-1" data-oid="a_b-nsw" />
            Live stream
          </Badge>
          <Badge variant="outline" data-oid="tbqxddq">
            <User2 className="w-4 h-4 mr-1" data-oid="6bfqlln" />
            {event.host}
          </Badge>
          <Badge variant="outline" data-oid="iphg43p">
            <Users className="w-4 h-4 mr-1" data-oid="-zrdbal" />
            {event.attendees} Attendees
          </Badge>
        </div>

        <div className="flex justify-between items-center" data-oid="dwvwxbu">
          <Button
            size="lg"
            variant={isGoing ? "outline" : "default"}
            onClick={handleRSVP}
            disabled={isLoading}
            className="w-32"
            data-oid="ekx0q8_"
          >
            {isLoading ? "Updating..." : isGoing ? "Cancel" : "RSVP"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
