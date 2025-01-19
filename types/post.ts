export type ReactionType = 'like' | 'heart' | 'celebrate' | 'support' | 'insightful';

export type ReportReason =
  | 'spam'
  | 'harassment'
  | 'hate_speech'
  | 'inappropriate_content'
  | 'misinformation'
  | 'other';

export interface Post {
  id: string;
  community_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_locked: boolean;
  parent_id: string | null;
}

export interface PostWithMetadata extends Post {
  author: {
    id: string;
    email: string;
    // Add other user fields as needed
  };
  reactions_count: Record<ReactionType, number>;
  current_user_reactions: ReactionType[];
  replies_count: number;
}

export interface PostReaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: ReactionType;
  created_at: string;
}

export interface PostReport {
  id: string;
  post_id: string;
  reporter_id: string;
  reason: ReportReason;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  resolved_at?: string;
}
