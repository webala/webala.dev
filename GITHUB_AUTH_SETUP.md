# GitHub Authentication Setup - Quick Reference

This guide shows you how to restrict admin dashboard access to only your GitHub account.

## ✅ What's Been Implemented

I've added the following security features:

1. **GitHub OAuth Login Button** - Users can now log in with GitHub
2. **Admin Email Verification** - Only specified emails can access the admin dashboard
3. **Automatic Signout** - Unauthorized users are automatically signed out and shown an error
4. **Error Messaging** - Clear feedback when access is denied

## 🔧 Setup Steps

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in the form:

   ```
   Application name: webala.dev
   Homepage URL: http://localhost:3000
   Authorization callback URL: https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
   ```

   > **Finding your callback URL:**
   >
   > - Go to Supabase Dashboard
   > - Navigate to Settings → API
   > - Copy your project URL and append `/auth/v1/callback`

4. Click **"Register application"**
5. **Save your Client ID and Client Secret** (you'll need these next)

### 2. Configure Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication → Providers**
3. Find **GitHub** in the provider list
4. Toggle it **ON** (enable it)
5. Enter your:
   - **Client ID** (from GitHub)
   - **Client Secret** (from GitHub)
6. Click **Save**

### 3. Add Environment Variable

Create or update your `.env.local` file in your project root:

```env
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# NEW: Add your GitHub email (REQUIRED)
NEXT_PUBLIC_ADMIN_EMAILS=your-github-email@example.com
```

**Important Notes:**

- Use the **exact email** associated with your GitHub account
- If you're not sure which email, check GitHub Settings → Emails
- For multiple admins, separate with commas: `email1@example.com,email2@example.com`
- If using GitHub's email privacy feature, use your GitHub-provided email like: `username@users.noreply.github.com`

### 4. Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
pnpm dev
```

## 🎯 How It Works

1. User clicks "Sign in with GitHub" on `/admin/login`
2. GitHub OAuth popup appears
3. User authorizes the app
4. System checks if user's email is in `NEXT_PUBLIC_ADMIN_EMAILS`
5. **If authorized:** User is signed in and redirected to dashboard
6. **If NOT authorized:** User is signed out and sees "Access denied" message

## 🔒 Security Features

- ✅ Only your specified email(s) can access the admin dashboard
- ✅ Works with both GitHub OAuth and email/password authentication
- ✅ Unauthorized users are automatically signed out
- ✅ Verification happens on every authentication attempt
- ✅ Clear error messages for unauthorized access

## 🧪 Testing

1. Navigate to `http://localhost:3000/admin/login`
2. Click **"Sign in with GitHub"**
3. Authorize the app in the GitHub popup
4. You should be redirected to `/admin/dashboard`

If you see "Access denied":

- Check that your `.env.local` has the correct email
- Verify the email matches your GitHub account email
- Restart your dev server after changing `.env.local`
- Check browser console for "Unauthorized access attempt by:" message

## 🚀 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Update GitHub OAuth App:**

   - Go back to your GitHub OAuth app settings
   - Add your production URL to Homepage URL
   - Add production callback: `https://yourdomain.com` (no specific path needed)

2. **Set Environment Variables:**

   - Add all three env vars to your hosting platform:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_ADMIN_EMAILS`

3. **Update Supabase Redirect URLs:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your production domain to "Site URL"
   - Add to "Redirect URLs": `https://yourdomain.com/**`

## 📁 Files Modified

- ✅ `app/admin/login/page.tsx` - Added GitHub login button
- ✅ `hooks/useAuth.ts` - Added admin email verification
- ✅ `lib/auth-utils.ts` - New utility for checking authorized admins
- ✅ `ADMIN_SETUP.md` - Updated with GitHub OAuth instructions

## 💡 Tips

- **GitHub Email Privacy:** If you have email privacy enabled on GitHub, your commits show a different email. Make sure to use the email GitHub sends to Supabase (check in browser console after login attempt)
- **Multiple Admins:** You can add multiple emails separated by commas if you need to grant access to other developers
- **Email/Password Still Works:** The existing email/password authentication is still available and respects the same email restrictions
- **Case Insensitive:** Email comparison is case-insensitive, so `Name@Example.Com` matches `name@example.com`

## 🆘 Troubleshooting

### Issue: "Access denied" after GitHub login

**Solution:**

1. Check browser console for which email was used
2. Update `NEXT_PUBLIC_ADMIN_EMAILS` to match exactly
3. Restart dev server
4. Try again

### Issue: GitHub OAuth popup doesn't appear

**Solution:**

1. Check if popup was blocked by browser
2. Verify GitHub OAuth app is configured correctly
3. Check Supabase GitHub provider is enabled
4. Verify callback URL is correct

### Issue: Can't find my GitHub email

**Solution:**

1. Go to https://github.com/settings/emails
2. Your primary email is listed at the top
3. If you use email privacy, use the provided `@users.noreply.github.com` email

## ✨ Next Steps

Now that GitHub authentication is set up with restricted access:

1. Test the login flow
2. Configure your production environment
3. Consider adding:
   - A logout button in the dashboard
   - User profile display showing GitHub avatar
   - Additional OAuth providers (Google, etc.)
   - Role-based permissions for multiple admin types

---

**Need help?** Check the browser console for detailed error messages or review `ADMIN_SETUP.md` for more comprehensive troubleshooting steps.
