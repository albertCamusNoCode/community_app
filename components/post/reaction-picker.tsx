"use client";

import React, { useState } from 'react';
import { ReactionType } from "@/types/post";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const AVAILABLE_REACTIONS: { type: ReactionType; emoji: string }[] = [
  { type: "like", emoji: "👍" },
  { type: "heart", emoji: "❤️" },
  { type: "laugh", emoji: "😄" },
  { type: "celebrate", emoji: "🎉" },
  { type: "support", emoji: "🙌" },
];

interface ReactionPickerProps {
  selectedReactions?: ReactionType[];
  onReactionsUpdate: (newReactions: ReactionType[]) => void;
  className?: string;
}

export function ReactionPicker({
  selectedReactions = [], // Provide default empty array
  onReactionsUpdate,
  className,
}: ReactionPickerProps) {
  const handleReactionClick = (type: ReactionType) => {
    const currentReactions = selectedReactions || [];
    const newReactions = currentReactions.includes(type)
      ? currentReactions.filter(r => r !== type) // Remove reaction
      : [...currentReactions, type]; // Add reaction
    onReactionsUpdate(newReactions);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-8 w-8 p-0", className)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2" align="start">
        <div className="flex gap-1">
          {AVAILABLE_REACTIONS.map(({ type, emoji }) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              className={cn("h-8 w-8 p-0 hover:bg-muted", {
                'bg-muted': (selectedReactions || []).includes(type),
              })}
              onClick={() => handleReactionClick(type)}
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
