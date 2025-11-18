-- Supabase Database Schema for Portfolio Website
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- Projects Table
-- CREATE TABLE IF NOT EXISTS projects (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   title TEXT NOT NULL,
--   description TEXT NOT NULL,
--   image_url TEXT,
--   demo_url TEXT,
--   github_url TEXT,
--   technologies TEXT[] DEFAULT '{}',
--   featured BOOLEAN DEFAULT false,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
--   order_index INTEGER DEFAULT 0
-- );

-- -- Blog Posts Table
-- CREATE TABLE IF NOT EXISTS blog_posts (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   title TEXT NOT NULL,
--   slug TEXT UNIQUE NOT NULL,
--   excerpt TEXT NOT NULL,
--   content TEXT NOT NULL,
--   cover_image TEXT,
--   featured BOOLEAN DEFAULT false,
--   published BOOLEAN DEFAULT false,
--   published_at TIMESTAMP WITH TIME ZONE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
--   reading_time INTEGER,
--   tags TEXT[] DEFAULT '{}'
-- );

-- -- Contact Messages Table
-- CREATE TABLE IF NOT EXISTS contact_messages (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   name TEXT NOT NULL,
--   email TEXT NOT NULL,
--   message TEXT NOT NULL,
--   read BOOLEAN DEFAULT false,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
-- );

-- -- Enable Row Level Security (RLS)
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- -- Create Policies

-- -- Projects: Public can view all projects
-- CREATE POLICY "Public can view projects"
--   ON projects
--   FOR SELECT
--   USING (true);

-- Projects: Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Projects: Authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Projects: Authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Blog Posts: Public can view published blog posts only
-- CREATE POLICY "Public can view published blog posts"
--   ON blog_posts
--   FOR SELECT
--   USING (published = true);

-- Blog Posts: Authenticated users can view all blog posts
CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Blog Posts: Authenticated users can insert blog posts
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts: Authenticated users can update blog posts
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Blog Posts: Authenticated users can delete blog posts
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Contact Messages: Allow anonymous users to insert contact messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
CREATE POLICY "Public can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact Messages: Authenticated users can view all messages
DROP POLICY IF EXISTS "Authenticated users can view all messages" ON contact_messages;
CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Contact Messages: Authenticated users can update messages (for marking as read)
DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
CREATE POLICY "Authenticated users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Contact Messages: Authenticated users can delete messages
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;
CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);

-- -- Create Indexes for better performance
-- CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
-- CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
-- CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- -- Clear existing data
-- -- WARNING: This will delete ALL existing projects and blog posts!
-- -- Comment out these lines if you want to keep existing data
-- DELETE FROM projects;
-- DELETE FROM blog_posts;

-- -- Reset sequences if needed
-- -- This ensures clean insertion of new data

-- -- Insert Project Data
-- INSERT INTO projects (title, description, image_url, demo_url, github_url, technologies, featured, order_index)
-- VALUES
--   (
--     'Swift POS (swift90s)',
--     'A point of sale system that has a wide range of features, including but not limited to, sales management, staff management, role bases access control, inventory management, customer management, reporting and analytics, payment processing via M-Pesa, expenses management and purchase order management.',
--     'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
--     'https://demo.example.com',
--     'https://github.com/webala',
--     ARRAY['ReactJs', 'TypeScript', 'DarajaApi', 'Django', 'Postgres', 'Docker', 'Redis'],
--     true,
--     1
--   );

-- -- Insert Blog Post Data
-- INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, featured, published, published_at, reading_time, tags)
-- VALUES
--   (
--     'TypeScript Best Practices in 2025',
--     'typescript-best-practices-2025',
--     'Discover the latest TypeScript best practices and patterns for writing maintainable code.',
--     '# TypeScript Best Practices in 2025\n\nTypeScript has become essential for modern web development...\n\n## Type Safety\n\nAlways use strict mode:\n\n```typescript\n// tsconfig.json\n{\n  "compilerOptions": {\n    "strict": true\n  }\n}\n```\n\n## Utility Types\n\nLeverage built-in utility types for better code reuse.',
--     'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
--     true,
--     true,
--     NOW() - INTERVAL '7 days',
--     8,
--     ARRAY['TypeScript', 'JavaScript', 'Programming']
--   );

-- Success message
SELECT 'Database schema created successfully! You can now start using your portfolio website.' AS message;

