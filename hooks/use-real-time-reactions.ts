"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { ReactionType } from "@/types/post";
import { useRouter } from "next/navigation";

export function useRealTimeReactions(postId: string) {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`post_reactions:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_reactions",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          // Refresh the current route
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, router, supabase]);
}
