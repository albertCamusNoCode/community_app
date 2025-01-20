import type { Database } from "@/lib/supabase/supabase-types";

export type Event = Database["public"]["Tables"]["events"]["Row"] & {
  attendees?: number;
};
