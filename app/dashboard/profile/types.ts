export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
    avatar_url?: string;
  };
  app_metadata: {
    provider?: string;
    [key: string]: any;
  };
  aud: string;
  created_at: string;
}

export interface ProfileActionState {
  success: boolean;
  message: string;
}
