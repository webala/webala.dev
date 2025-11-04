# Software Engineer Portfolio

A modern, beautiful portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 Modern design based on provided mockup with exact color scheme
- 💼 Projects showcase with featured projects
- 📝 Blog system with featured posts and individual blog pages
- 📬 Contact form with Supabase backend
- 🎯 Skill-set section with 6 service cards
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🚀 Built with Next.js 15 App Router
- 🔥 TanStack Query for data fetching
- 💾 Supabase for backend and database

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Markdown**: React Markdown
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- A Supabase account (free tier works fine)

### 1. Clone and Install

```bash
# Navigate to project directory
cd webala.dev

# Install dependencies
pnpm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon/public key
4. Create the database tables using the SQL in `supabase-schema.sql`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Project Structure

```
webala.dev/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form handler
│   ├── blog/                # Blog pages
│   │   ├── [slug]/         # Individual blog post
│   │   └── page.tsx        # All blog posts
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles with design colors
├── components/              # React components
│   ├── BlogCard.tsx
│   ├── ContactForm.tsx
│   ├── FeaturedBlogs.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   ├── Projects.tsx
│   ├── SkillCard.tsx
│   └── SkillSet.tsx
├── lib/                     # Utility functions
│   ├── providers.tsx       # TanStack Query provider
│   ├── queries.ts          # Supabase queries
│   └── supabase.ts         # Supabase client
└── types/                   # TypeScript types
    └── index.ts
```

## Database Schema

See `supabase-schema.sql` for the complete database setup. The schema includes:

- **projects**: Store portfolio projects
- **blog_posts**: Store blog articles
- **contact_messages**: Store contact form submissions

## Adding Content

### Add Projects

1. Go to your Supabase dashboard
2. Navigate to Table Editor > projects
3. Click "Insert row"
4. Fill in project details:
   - title, description, image_url
   - demo_url, github_url
   - technologies (array)
   - featured (boolean)

### Add Blog Posts

1. Go to your Supabase dashboard
2. Navigate to Table Editor > blog_posts
3. Click "Insert row"
4. Fill in blog post details:
   - title, slug (URL-friendly)
   - excerpt, content (markdown supported)
   - cover_image, tags
   - featured, published

### View Contact Messages

Contact form submissions are automatically stored in the `contact_messages` table in Supabase.

## Design Colors

The exact colors from the design mockup:

- **Primary**: `#ff5757` (Coral Red)
- **Background**: `#1a1625` (Dark Navy)
- **Card Background**: `#252131` (Lighter Dark)
- **Text**: `#ffffff` (White)
- **Text Secondary**: `#9ca3af` (Gray)

## Deployment

### Deploy to Vercel

The easiest way to deploy:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Make sure to add your environment variables in the Vercel dashboard.

## Customization

### Update Skills

Edit `components/SkillSet.tsx` to customize the skills displayed.

### Update Navigation

Edit `components/Navigation.tsx` to add or remove navigation items.

### Modify Colors

Edit `app/globals.css` to change the color scheme.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
