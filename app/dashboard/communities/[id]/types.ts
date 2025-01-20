import type { PostWithMetadata } from "@/app/actions/post";

export type TrendingPost = Pick<PostWithMetadata, 'id' | 'title' | 'content' | 'author'>;
