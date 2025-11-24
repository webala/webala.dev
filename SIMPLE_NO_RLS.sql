-- ========================================
-- SIMPLE FIX: Contact Messages Table WITHOUT RLS
-- ========================================
-- This drops the table and recreates it without Row Level Security

-- Step 1: Drop the table completely (this removes all policies too)
DROP TABLE IF EXISTS contact_messages CASCADE;

-- Step 2: Create the contact_messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: DO NOT enable RLS - leave it disabled for public access
-- (RLS is disabled by default, so we don't need to do anything)

-- Step 4: Create indexes for better performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_read ON contact_messages(read);

-- Step 5: Verify the table was created
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'contact_messages'
ORDER BY ordinal_position;

-- Step 6: Check that RLS is disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'contact_messages';

-- Success message
SELECT 'Contact messages table created successfully WITHOUT RLS!' AS message;
