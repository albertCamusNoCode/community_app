"use client";

import { ReactionType } from "@/app/actions/post";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  like: "👍",
  heart: "❤️",
  celebrate: "🎉",
  support: "🙌",
  insightful: "💡",
};

interface AnimatedReactionButtonProps {
  reactionType: ReactionType;
  count: number;
  isReacted: boolean;
  onReact: (type: ReactionType) => Promise<void>;
  className?: string;
}

export function AnimatedReactionButton({
  reactionType,
  count,
  isReacted,
  onReact,
  className,
}: AnimatedReactionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    setIsAnimating(true);
    await onReact(reactionType);
    // Animation will reset after 600ms
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-7 rounded-full border bg-background px-3 text-xs hover:bg-muted",
        isReacted && "border-primary bg-primary/10",
        className
      )}
      onClick={handleClick}
    >
      <AnimatePresence>
        <motion.span
          key={`${reactionType}-${isAnimating}`}
          initial={isAnimating ? { scale: 1 } : {}}
          animate={
            isAnimating
              ? {
                  scale: [1, 1.5, 1],
                  rotate: [0, 15, -15, 0],
                }
              : {}
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="mr-1.5"
        >
          {REACTION_EMOJIS[reactionType]}
        </motion.span>
      </AnimatePresence>
      <span>{count}</span>
    </Button>
  );
}
