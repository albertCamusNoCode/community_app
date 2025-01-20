"use client";

import { addReaction, removeReaction, reportPost } from "@/app/actions/post";
import { getReplies, createReply } from "@/app/actions/reply";
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
import { PostWithMetadata, ReactionType, ReportReason } from "@/app/actions/post";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/app/actions/use-toast";
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
import { useState, useEffect } from "react";
import { ReactionPicker } from "./reaction-picker";
import { cn } from "@/lib/utils";
import { usePostFeed } from "@/app/dashboard/communities/[id]/components/post-feed-context";
import { ReplyComponent } from "./reply";
import type { Reply } from "@/app/actions/reply";

const REACTION_EMOJIS: Record<ReactionType, string> = {
  like: "👍",
  heart: "❤️",
  celebrate: "🎉",
  support: "🙌",
  insightful: "💡",
};

interface PostCardProps {
  post: PostWithMetadata;
}

type ReactionCount = Record<ReactionType, number>;

function getReactionCount(reactions: ReactionCount, type: ReactionType): number {
  return reactions[type] || 0;
}

interface AnimatedReactionButtonProps {
  reactionType: ReactionType;
  count: number;
  isReacted: boolean;
  onReact: (type: ReactionType) => void;
}

function AnimatedReactionButton({
  reactionType,
  count,
  isReacted,
  onReact,
}: AnimatedReactionButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-1",
        isReacted && "text-primary"
      )}
      onClick={() => onReact(reactionType)}
    >
      <span>{REACTION_EMOJIS[reactionType]}</span>
      <span>{count}</span>
    </Button>
  );
}

const reportReasons: { value: ReportReason; label: string }[] = [
  { value: "spam", label: "Spam" },
  { value: "harassment", label: "Harassment" },
  { value: "hate_speech", label: "Hate Speech" },
  { value: "inappropriate_content", label: "Inappropriate Content" },
  { value: "misinformation", label: "Misinformation" },
  { value: "other", label: "Other" },
];

export function PostCard({ post }: { post: PostWithMetadata }) {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason>("spam");
  const [reportDescription, setReportDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { updatePost } = usePostFeed();

  useEffect(() => {
    if (showReplies) {
      startTransition(refreshReplies);
    }
  }, [showReplies, post.id]);

  const refreshReplies = async () => {
    try {
      const postReplies = await getReplies(post.id);
      setReplies(postReplies);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load replies",
        variant: "destructive",
      });
    }
  };

  const handleReaction = async (type: ReactionType) => {
    const hasReacted = post.current_user_reactions?.includes(type) || false;
    
    // Optimistically update the UI
    const newReactions = hasReacted 
      ? post.current_user_reactions.filter(r => r !== type)
      : [...post.current_user_reactions, type];
    
    const newCount = {
      ...post.reactions_count,
      [type]: (post.reactions_count[type] || 0) + (hasReacted ? -1 : 1)
    };

    // Update local state immediately
    const updatedPost = {
      ...post,
      current_user_reactions: newReactions,
      reactions_count: newCount
    };

    // Update the post in the feed context
    updatePost(updatedPost);

    try {
      await addReaction(post.id, type);
    } catch (error) {
      // Revert optimistic update on error
      updatePost(post);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleReport = async () => {
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
  };

  const handleReply = async () => {
    try {
      await createReply(post.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
      
      // Refresh replies after a short delay to allow server revalidation
      setTimeout(refreshReplies, 100);
      
      toast({
        title: "Reply added",
        description: "Your reply has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reply",
        variant: "destructive",
      });
    }
  };

  // Group reactions by type and sort by count
  const groupedReactions = Object.entries(post.reactions_count || {})
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type as ReactionType);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={post.author.avatar_url || `/placeholder.svg`}
                alt={post.author.name || "Anonymous"}
              />
              <AvatarFallback>
                {(post.author.name || "A").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {post.author.name || post.author.email?.split("@")[0] || "Anonymous"}
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Report
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onSelect={() => {
                  const url = `${window.location.origin}/dashboard/communities/${post.community_id}/posts/${post.id}`;
                  navigator.clipboard.writeText(url);
                  toast({
                    title: "Link copied",
                    description: "Post link has been copied to your clipboard",
                  });
                }}>
                  Copy link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Please provide additional details about your report"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReport} disabled={isPending}>
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {post.title && (
          <h2 className="text-xl font-semibold tracking-tight">{post.title}</h2>
        )}
        <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(REACTION_EMOJIS).map(([type, emoji]) => {
              const reactionCount = getReactionCount(post.reactions_count, type as ReactionType);
              if (reactionCount === 0) return null;
              return (
                <AnimatedReactionButton
                  key={type}
                  reactionType={type as ReactionType}
                  count={reactionCount}
                  isReacted={post.current_user_reactions?.includes(type as ReactionType)}
                  onReact={handleReaction}
                />
              );
            })}
            <ReactionPicker 
              selectedReactions={post.current_user_reactions || []}
              onReactionsUpdate={async (newReactions) => {
                // Calculate which reactions to add/remove
                const existingReactions = post.current_user_reactions || [];
                const reactionsToAdd = newReactions.filter(r => !existingReactions.includes(r));
                const reactionsToRemove = existingReactions.filter(r => !newReactions.includes(r));

                // Update local state immediately
                const updatedPost = {
                  ...post,
                  current_user_reactions: newReactions,
                  reactions_count: {
                    ...post.reactions_count,
                    ...reactionsToAdd.reduce((acc, type) => ({
                      ...acc,
                      [type]: (post.reactions_count[type] || 0) + 1
                    }), {}),
                    ...reactionsToRemove.reduce((acc, type) => ({
                      ...acc,
                      [type]: Math.max(0, (post.reactions_count[type] || 0) - 1)
                    }), {})
                  }
                };

                // Update UI optimistically
                updatePost(updatedPost);

                try {
                  // Remove reactions that are no longer selected
                  if (reactionsToRemove.length) {
                    await removeReaction(post.id);
                  }
                  // Add new reactions
                  for (const type of reactionsToAdd) {
                    await addReaction(post.id, type);
                  }
                } catch (error) {
                  // Revert optimistic update on error
                  updatePost(post);
                  toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Something went wrong",
                    variant: "destructive",
                  });
                }
              }}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Hide Replies" : "Show Replies"}
          </Button>
        </div>

        {showReplies && (
          <div className="w-full space-y-4">
            {isReplying ? (
              <div className="space-y-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button onClick={handleReply}>Reply</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsReplying(true)}
              >
                Write a reply...
              </Button>
            )}

            {replies.map((reply) => (
              <ReplyComponent
                key={reply.id}
                reply={reply}
                postId={post.id}
                currentUserId={post.author.id}
                onReplyAdded={refreshReplies}
              />
            ))}
          </div>
        )}
      </CardFooter>
    </div>
  );
}
