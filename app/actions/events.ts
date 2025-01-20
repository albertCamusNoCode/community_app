'use server';

import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/app/dashboard/events/types";

export async function getEvents(communityId: string): Promise<Event[]> {
  try {
    const supabase = await createClient();

    const { data: events, error } = await supabase
      .from('events')
      .select()
      .eq('community_id', communityId)
      .gte('end_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(5);

    if (error) {
      console.error('Error fetching events:', { 
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }

    // For now, return events without attendee count
    return events?.map(event => ({
      ...event,
      attendees: 0 // placeholder
    })) || [];
  } catch (e) {
    console.error('Unexpected error in getEvents:', e);
    return [];
  }
}
