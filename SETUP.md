# Quick Setup Guide

## 🚀 Get Your Portfolio Running in 5 Minutes

### Step 1: Set Up Supabase (5 minutes)

1. **Create a Supabase Account**

   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Fill in project details and wait for setup (~2 min)

2. **Get Your Credentials**

   - Go to Project Settings (⚙️ icon) > API
   - Copy the "Project URL" and "anon/public" key
   - Keep this tab open!

3. **Create Database Tables**
   - Go to SQL Editor in your Supabase dashboard
   - Click "New Query"
   - Copy the entire contents of `supabase-schema.sql`
   - Paste and click "Run"
   - You should see "Database schema created successfully!"

### Step 2: Configure Your Environment

1. **Open** your project in a code editor
2. **Create** a file named `.env.local` in the root directory
3. **Add** your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-from-step-1
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-step-1
```

4. **Save** the file

### Step 3: Run the Development Server

```bash
# Make sure you're in the project directory
cd webala.dev

# Install dependencies (if not already done)
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ What You Should See

- **Hero Section**: "Hello, I'm a Software Engineer"
- **Skill-Set Section**: 6 skill cards with icons
- **Projects Section**: Sample projects from database
- **Blog Section**: 3 featured blog posts
- **Contact Form**: Working contact form

## 📝 Next Steps

### Add Your Own Content

1. **Update Projects**

   - Go to Supabase > Table Editor > projects
   - Click "Insert row" or edit existing projects
   - Add your own projects with images and links

2. **Write Blog Posts**

   - Go to Supabase > Table Editor > blog_posts
   - Add your own blog posts
   - Use markdown for formatting

3. **Customize Skills**

   - Edit `components/SkillSet.tsx`
   - Update the skills array with your own skills

4. **Update Personal Info**
   - Edit hero text in `components/Hero.tsx`
   - Update navigation in `components/Navigation.tsx`
   - Modify metadata in `app/layout.tsx`

### Deploy to Production

**Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Don't forget to add environment variables in Vercel settings!

**Option 2: Other Platforms**

- Netlify
- Cloudflare Pages
- AWS Amplify

All work great with Next.js!

## 🐛 Troubleshooting

### "Unable to load projects/blogs"

**Solution**: Check your `.env.local` file has the correct Supabase credentials

### TypeScript errors

**Solution**: Restart your development server and IDE

### Nothing showing up

**Solution**: Make sure you ran the `supabase-schema.sql` in your Supabase SQL Editor

### Contact form not working

**Solution**:

1. Check Supabase credentials
2. Verify the `contact_messages` table exists
3. Check Row Level Security policies are set up

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)

## 🎨 Design Colors Reference

- **Primary (Coral Red)**: `#ff5757`
- **Background Dark**: `#1a1625`
- **Card Background**: `#252131`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#9ca3af`

## 💡 Tips

1. **Images**: Use high-quality images from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com)
2. **Content**: Keep descriptions concise and impactful
3. **SEO**: Update metadata in each page component
4. **Performance**: Optimize images before uploading to Supabase storage

## 🆘 Need Help?

- Check the main `README.md` for detailed documentation
- Review the code comments in each component
- Open an issue on GitHub

Happy coding! 🚀
