-- Complete Fix for Contact Messages RLS Policy Issues
-- Run this ENTIRE script in your Supabase SQL Editor

-- Step 1: Disable RLS temporarily to clean up
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on contact_messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "anon can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view all messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;

-- Step 3: Re-enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 4: Create the INSERT policy for anonymous users (this is the critical one)
CREATE POLICY "anon_insert_contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 5: Also allow authenticated users to insert (just in case)
CREATE POLICY "authenticated_insert_contact_messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Step 6: Allow authenticated users to SELECT (view messages in admin)
CREATE POLICY "authenticated_select_contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 7: Allow authenticated users to UPDATE (mark as read)
CREATE POLICY "authenticated_update_contact_messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Step 8: Allow authenticated users to DELETE
CREATE POLICY "authenticated_delete_contact_messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);

-- Step 9: Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'contact_messages'
ORDER BY cmd, policyname;

-- Step 10: Test with a sample insert (this should work)
-- You can comment this out if you don't want test data
-- INSERT INTO contact_messages (name, email, message)
-- VALUES ('Test User', 'test@example.com', 'This is a test message from RLS fix');

-- Success message
SELECT 'Contact messages RLS policies have been fixed!' AS status;


