'use client';

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Reply } from "@/actions/reply";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/actions/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { createReply, updateReply, deleteReply } from "@/actions/reply";

interface ReplyProps {
  reply: Reply;
  postId: string;
  currentUserId: string;
  depth?: number;
  onReplyAdded?: () => void;
}

export function ReplyComponent({ reply, postId, currentUserId, depth = 0, onReplyAdded }: ReplyProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(reply.content);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = async () => {
    try {
      await createReply(postId, replyContent, reply.id);
      setReplyContent("");
      setIsReplying(false);
      
      // Refresh replies after a short delay to allow server revalidation
      setTimeout(() => onReplyAdded?.(), 100);
      
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

  const handleUpdate = async () => {
    try {
      await updateReply(reply.id, content);
      setIsEditing(false);
      
      // Refresh replies after a short delay to allow server revalidation
      setTimeout(() => onReplyAdded?.(), 100);
      
      toast({
        title: "Reply updated",
        description: "Your reply has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update reply",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReply(reply.id);
      
      // Refresh replies after a short delay to allow server revalidation
      setTimeout(() => onReplyAdded?.(), 100);
      
      toast({
        title: "Reply deleted",
        description: "Your reply has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete reply",
        variant: "destructive",
      });
    }
  };

  if (depth > 3) return null; // Limit nesting depth

  return (
    <div className="space-y-4" style={{ marginLeft: depth ? `${depth * 24}px` : 0 }}>
      <div className="flex items-start gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={reply.author.avatar_url || `/placeholder.svg`}
            alt={reply.author.name || "Anonymous"}
          />
          <AvatarFallback>
            {(reply.author.name || "A").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {reply.author.name || reply.author.email?.split("@")[0] || "Anonymous"}
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">
                {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
              </span>
            </div>

            {currentUserId === reply.author.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleUpdate}>Save</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setContent(reply.content);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {reply.content}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </Button>
          </div>

          {isReplying && (
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
          )}
        </div>
      </div>

      {reply.replies?.map((childReply) => (
        <ReplyComponent
          key={childReply.id}
          reply={childReply}
          postId={postId}
          currentUserId={currentUserId}
          depth={(depth || 0) + 1}
          onReplyAdded={onReplyAdded}
        />
      ))}
    </div>
  );
}
