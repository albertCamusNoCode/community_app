-- Insert sample communities
INSERT INTO communities (id, name, description, image_url, created_at, updated_at)
VALUES
  ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'ModernMind™', 'A community for mindful living and personal growth', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oxBQXCffWRgCXJuvwqgF4RdDzCu15e.png', NOW(), NOW()),
  ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Tech Innovators', 'Where technology meets creativity', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', NOW(), NOW()),
  ('d290f1ee-6c54-4b01-90e6-d701748f0853', 'Fitness First', 'Your journey to a healthier lifestyle starts here', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', NOW(), NOW());

-- Get the current user's ID (you'll need to replace this with your actual user ID from auth.users)
DO $$
DECLARE
  current_user_id UUID;
BEGIN
  -- Get the first user from auth.users
  SELECT id INTO current_user_id FROM auth.users LIMIT 1;

  -- Insert community members
  INSERT INTO community_members (community_id, user_id, role, joined_at)
  VALUES
    ('d290f1ee-6c54-4b01-90e6-d701748f0851', current_user_id, 'admin', NOW()),
    ('d290f1ee-6c54-4b01-90e6-d701748f0852', current_user_id, 'member', NOW()),
    ('d290f1ee-6c54-4b01-90e6-d701748f0853', current_user_id, 'moderator', NOW());

  -- Insert sample posts
  INSERT INTO posts (id, community_id, user_id, title, content, is_pinned, created_at, updated_at)
  VALUES
    ('123e4567-e89b-12d3-a456-426614174001', 'd290f1ee-6c54-4b01-90e6-d701748f0851', current_user_id, 'Welcome to ModernMind™!', 'This is our first community post. We''re excited to have you here!', true, NOW(), NOW()),
    ('123e4567-e89b-12d3-a456-426614174002', 'd290f1ee-6c54-4b01-90e6-d701748f0851', current_user_id, 'Daily Mindfulness Challenge', 'Take 5 minutes today to practice mindful breathing...', false, NOW(), NOW()),
    ('123e4567-e89b-12d3-a456-426614174003', 'd290f1ee-6c54-4b01-90e6-d701748f0851', current_user_id, 'Weekend Meditation Session', 'Join us this weekend for a group meditation session...', false, NOW(), NOW()),
    
    ('123e4567-e89b-12d3-a456-426614174004', 'd290f1ee-6c54-4b01-90e6-d701748f0852', current_user_id, 'Latest Tech Trends 2025', 'AI and quantum computing are reshaping our future...', true, NOW(), NOW()),
    ('123e4567-e89b-12d3-a456-426614174005', 'd290f1ee-6c54-4b01-90e6-d701748f0852', current_user_id, 'Web Development Best Practices', 'Here are some tips for modern web development...', false, NOW(), NOW()),
    
    ('123e4567-e89b-12d3-a456-426614174006', 'd290f1ee-6c54-4b01-90e6-d701748f0853', current_user_id, 'Getting Started with Fitness', 'New to fitness? Here''s your beginner''s guide...', true, NOW(), NOW()),
    ('123e4567-e89b-12d3-a456-426614174007', 'd290f1ee-6c54-4b01-90e6-d701748f0853', current_user_id, 'Nutrition Tips for Athletes', 'Proper nutrition is key to achieving your fitness goals...', false, NOW(), NOW());

  -- Insert some reactions
  INSERT INTO post_reactions (post_id, user_id, reaction_type, created_at)
  VALUES
    ('123e4567-e89b-12d3-a456-426614174001', current_user_id, 'like', NOW()),
    ('123e4567-e89b-12d3-a456-426614174002', current_user_id, 'celebrate', NOW()),
    ('123e4567-e89b-12d3-a456-426614174004', current_user_id, 'insightful', NOW()),
    ('123e4567-e89b-12d3-a456-426614174006', current_user_id, 'like', NOW());

END $$;
