"use client";

import { addReaction, removeReaction, reportPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostWithMetadata, ReactionType, ReportReason } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "@/actions/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AnimatedReactionButton } from "./animated-reaction-button";
import { ReactionPicker } from "./reaction-picker";
import { useRealTimeReactions } from "@/hooks/use-real-time-reactions";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  like: "👍",
  heart: "❤️",
  laugh: "😄",
  celebrate: "🎉",
  support: "🙌",
};

interface PostCardProps {
  post: PostWithMetadata;
}

export function PostCard({ post }: PostCardProps) {
  const [isPending, startTransition] = useTransition();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason>("spam");
  const [reportDescription, setReportDescription] = useState("");
  useRealTimeReactions(post.id);

  const handleReaction = async (type: ReactionType) => {
    try {
      const hasReacted = hasReactedToType(type);

      if (hasReacted) {
        await removeReaction(post.id);
      } else {
        await addReaction(post.id, type);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const getReactionCount = (type: ReactionType) => {
    return post.reactions_count?.[type] || 0;
  };

  const hasReactedToType = (type: ReactionType) => {
    return post.current_user_reactions?.includes(type) || false;
  };

  const handleReport = async () => {
    startTransition(async () => {
      try {
        await reportPost(post.id, reportReason, reportDescription);
        setIsReportDialogOpen(false);
        toast({
          title: "Report submitted",
          description: "Thank you for helping keep our community safe",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  // Group reactions by type and sort by count
  const groupedReactions = Object.entries(post.reactions_count || {})
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type as ReactionType);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author.email}`} />
            <AvatarFallback>{post.author.email[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.title}</div>
            <div className="text-sm text-muted-foreground">
              Posted by {post.author.email.split("@")[0]}{" "}
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setIsReportDialogOpen(true)}>
                Report
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap items-center gap-2 p-4 pt-0">
          {groupedReactions.map((type) => (
            <AnimatedReactionButton
              key={type}
              reactionType={type}
              count={getReactionCount(type)}
              isReacted={hasReactedToType(type)}
              onReact={handleReaction}
            />
          ))}
          <ReactionPicker 
            selectedReactions={post.current_user_reactions || []}
            onReactionsUpdate={async (newReactions) => {
              try {
                // Remove all existing reactions first
                if (post.current_user_reactions?.length) {
                  await removeReaction(post.id);
                }
                // Add new reactions
                for (const type of newReactions) {
                  await addReaction(post.id, type);
                }
              } catch (error) {
                toast({
                  title: "Error",
                  description: error instanceof Error ? error.message : "Something went wrong",
                  variant: "destructive",
                });
              }
            }}
          />
        </div>
      </CardFooter>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Post</DialogTitle>
            <DialogDescription>
              Help us understand why you're reporting this post
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <Select
                value={reportReason}
                onValueChange={(value) => setReportReason(value as ReportReason)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="hate_speech">Hate Speech</SelectItem>
                  <SelectItem value="inappropriate_content">
                    Inappropriate Content
                  </SelectItem>
                  <SelectItem value="misinformation">Misinformation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Please provide additional details about your report..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReportDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleReport} disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
