# Admin Dashboard Setup Guide

This guide will help you set up and use the admin dashboard for your portfolio website.

## 🚀 Initial Setup

### 1. Supabase Configuration

First, make sure you have your Supabase project set up with the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Authorization (Required for GitHub OAuth)
# Add your GitHub email(s) here (comma-separated for multiple admins)
NEXT_PUBLIC_ADMIN_EMAILS=your-github-email@example.com
```

**Important:** The `NEXT_PUBLIC_ADMIN_EMAILS` variable restricts admin access to only the specified email addresses. This is especially important when using GitHub OAuth authentication.

### 2. Run Database Schema

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and run it in the SQL Editor

This will:

- Create all necessary tables (projects, blog_posts, contact_messages)
- Set up Row Level Security (RLS) policies
- Create indexes for better performance
- Insert sample data (optional - you can remove the INSERT statements)

### 3. Set Up Authentication

You can authenticate using either email/password or GitHub OAuth (or both):

#### Option A: Email/Password Authentication

In your Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter your admin email and password
4. Click **Create User**

**Important:** Save your credentials securely!

#### Option B: GitHub OAuth Authentication (Recommended)

1. **Create GitHub OAuth App:**

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in:
     - **Application name:** `webala.dev` (or your preferred name)
     - **Homepage URL:** `http://localhost:3000` (for development)
     - **Authorization callback URL:** `https://your-project-ref.supabase.co/auth/v1/callback`
       - Get this URL from your Supabase Dashboard → Settings → API
   - Click "Register application"
   - Copy the **Client ID** and generate a **Client Secret**

2. **Configure Supabase:**

   - Go to your Supabase Dashboard
   - Navigate to **Authentication** → **Providers**
   - Find **GitHub** and enable it
   - Enter your GitHub **Client ID** and **Client Secret**
   - Save changes

3. **Add Your GitHub Email to Environment Variables:**
   - Make sure your `.env.local` has `NEXT_PUBLIC_ADMIN_EMAILS` set to your GitHub account email
   - This ensures only your GitHub account can access the admin dashboard

**Security Note:** Only GitHub accounts with emails listed in `NEXT_PUBLIC_ADMIN_EMAILS` will be granted access. Anyone else attempting to log in via GitHub will be automatically signed out and denied access.

### 4. Restart Development Server

After setting up the database and creating your admin user, restart your development server:

```bash
pnpm dev
```

This ensures all environment variables and middleware are properly loaded.

## 📱 Accessing the Admin Dashboard

### Login

1. Navigate to `/admin/login` on your website
2. Choose your authentication method:
   - **Email/Password:** Enter your credentials and click "Sign In"
   - **GitHub OAuth:** Click "Sign in with GitHub" and authorize the app
3. You'll be redirected to `/admin/dashboard`

**Note:** If you see "Access denied" error, verify that your email is listed in the `NEXT_PUBLIC_ADMIN_EMAILS` environment variable.

### Dashboard Overview

The dashboard has four main sections:

#### 1. **Dashboard** (`/admin/dashboard`)

- View statistics (total blog posts, projects, messages)
- Quick actions to create content
- Unread message count

#### 2. **Blog Posts** (`/admin/dashboard/blog-posts`)

- View all blog posts (published and drafts)
- Create new posts with markdown support
- Edit existing posts
- Delete posts
- Toggle published status
- Mark posts as featured

**Creating a Blog Post:**

- Click "New Post"
- Fill in:
  - Title (auto-generates slug)
  - Slug (URL-friendly identifier)
  - Excerpt (short description)
  - Content (markdown supported)
  - Cover Image URL
  - Reading Time (in minutes)
  - Tags (comma-separated)
  - Featured checkbox
  - Publish checkbox

#### 3. **Projects** (`/admin/dashboard/projects`)

- View all projects
- Add new projects
- Edit existing projects
- Delete projects
- Reorder with order_index

**Creating a Project:**

- Click "New Project"
- Fill in:
  - Title
  - Description
  - Image URL
  - Demo URL (optional)
  - GitHub URL (optional)
  - Technologies (comma-separated)
  - Order Index (lower numbers appear first)
  - Featured checkbox

#### 4. **Messages** (`/admin/dashboard/messages`)

- View all contact form submissions
- Filter by: All, Unread, Read
- Mark messages as read/unread
- Delete messages
- Bulk "Mark all as read" action

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Projects:**

- Public can view all projects
- Authenticated users can create, update, and delete projects

**Blog Posts:**

- Public can only view published posts
- Authenticated users can view all posts (including drafts)
- Authenticated users can create, update, and delete posts

**Contact Messages:**

- Anyone can submit messages (via contact form)
- Only authenticated users can view, update, and delete messages

### Middleware Protection

The middleware (`middleware.ts`) automatically:

- Redirects unauthenticated users from admin routes to `/admin/login`
- Redirects authenticated users from login page to dashboard
- Protects all routes under `/admin/*` except `/admin/login`

## 🎨 Features

### Blog Post Management

- ✅ Markdown editor for content
- ✅ Auto-slug generation from title
- ✅ Draft/Published status
- ✅ Featured posts
- ✅ Tags system
- ✅ Reading time estimation
- ✅ Cover images
- ✅ Edit/Delete functionality

### Project Management

- ✅ Full CRUD operations
- ✅ Image support
- ✅ Demo and GitHub links
- ✅ Technology tags
- ✅ Custom ordering
- ✅ Featured projects

### Message Management

- ✅ Read/Unread status
- ✅ Filtering options
- ✅ Mark all as read
- ✅ Email links for quick replies
- ✅ Delete functionality

## 🔧 Troubleshooting

### Can't Login?

1. **Verify Supabase credentials** in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` should be set
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be set
   - `NEXT_PUBLIC_ADMIN_EMAILS` should be set to your email
2. **Check user exists** in Supabase Dashboard → Authentication → Users
3. **Ensure database schema** has been run successfully
4. **Check browser console** for error messages
5. **Restart your dev server** after adding environment variables
6. **Clear browser cookies** and try again

### "Access denied" Error After GitHub Login?

If you successfully authenticate with GitHub but see "Access denied":

1. **Check your GitHub email:** Go to GitHub Settings → Emails and note your primary email
2. **Verify environment variable:** Ensure `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local` matches your GitHub email exactly
3. **Multiple emails:** If you have multiple admins, separate emails with commas: `email1@example.com,email2@example.com`
4. **Restart dev server:** After updating `.env.local`, restart your development server
5. **Check console:** Look for "Unauthorized access attempt by:" message in browser console to see which email was used
6. **GitHub email privacy:** If you use GitHub's email privacy feature, use your GitHub-provided email (e.g., `username@users.noreply.github.com`)

### Login Successful but Not Redirected?

The authentication system uses hard navigation (`window.location.href`) to ensure proper session handling:

1. **Check middleware** is working (it should redirect unauthenticated users)
2. **Verify cookies** are being set (check browser DevTools → Application → Cookies)
3. **Look for Supabase auth cookies** starting with `sb-`
4. **Try in incognito mode** to rule out cookie/cache issues
5. **Check console logs** - the login page logs data and error for debugging

### Policies Not Working?

1. Make sure RLS is enabled on all tables
2. Verify the policies were created correctly
3. Check that you're authenticated (session exists)

### Images Not Displaying?

- Use absolute URLs for images (e.g., `https://example.com/image.jpg`)
- Consider using Supabase Storage for image hosting
- Or use external services like Cloudinary, Imgur, or Unsplash

## 📝 Best Practices

### Blog Posts

- Use descriptive slugs (they can't be changed after creation)
- Add relevant tags for better organization
- Set realistic reading times
- Use high-quality cover images (1200x600px recommended)
- Preview markdown before publishing

### Projects

- Use order_index strategically (0 for most important)
- Keep descriptions concise but informative
- Always include working demo or GitHub links
- Use clear, professional project images

### Messages

- Check regularly for new messages
- Mark messages as read after responding
- Delete spam messages to keep inbox clean

## 🚀 Deployment Notes

When deploying to production:

1. **Environment Variables:** Ensure all Supabase env vars are set in your hosting platform
2. **Middleware:** Next.js middleware works on Edge runtime - compatible with Vercel, Netlify, etc.
3. **Authentication:** Supabase Auth works across all deployments
4. **Database:** Your Supabase database is already hosted and accessible

## 📱 Mobile Responsive

The admin dashboard is fully responsive and works on:

- Desktop (optimal experience)
- Tablet
- Mobile (basic functionality)

## 🎯 Future Enhancements

Potential features to add:

- [ ] Rich text editor (WYSIWYG)
- [ ] Image upload to Supabase Storage
- [ ] Analytics dashboard
- [ ] User management (multiple admins)
- [ ] Comment moderation
- [ ] SEO metadata editor
- [ ] Bulk operations
- [ ] Export/Import data

## 💡 Tips

- Use the featured flag strategically - only mark your best content as featured
- Keep your order_index values spaced out (0, 10, 20) to allow easy reordering
- Regularly backup your Supabase database
- Test blog posts in draft mode before publishing
- Keep the Swift POS project at order_index 1 to display it first

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Verify Supabase connection
3. Review the RLS policies in Supabase dashboard
4. Check that all environment variables are set correctly
