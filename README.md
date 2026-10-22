# Software Engineer Portfolio

Personal portfolio of Daniel Webala — a dark, cinematic single-page site with a particle-sphere hero, projects and articles fed from Supabase, an experience timeline, an online résumé and a contact call to action. Built with Next.js 16, TypeScript, Tailwind CSS 4 and Supabase.

## Features

- 🌊 "Abyssal terminal" design language: teal surface stack, Inter at weights 400/500 only, no shadows
- 🔮 Canvas particle-sphere hero that pauses off-screen and respects reduced motion
- 💼 Featured projects from Supabase, with a static fallback so the section never renders empty
- 🧭 Work-experience timeline sourced from `lib/content/experience.ts` (shared with the résumé page)
- 📄 Online résumé at `/resume` plus PDF download
- 📝 Blog with featured-article preview, search, and per-post metadata
- 📬 Contact call to action: direct channels plus a Supabase-backed form with a honeypot
- 🔐 Admin dashboard for projects, posts and messages
- 📱 Fully responsive with a working mobile menu
- 🚀 Next.js 16 App Router
- 🔥 TanStack Query for data fetching
- 💾 Supabase for backend and database

## Tech Stack

- **Framework**: Next.js 16 with App Router
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
├── app/
│   ├── (site)/              # Public site: shared Navigation + Footer layout
│   │   ├── page.tsx         # Home: Hero → Projects → Experience → Articles → Contact
│   │   ├── blog/            # Writing index and per-post pages
│   │   └── resume/          # Online résumé
│   ├── admin/               # Admin dashboard (Supabase auth)
│   ├── api/contact/         # Contact form handler
│   ├── layout.tsx           # Root layout, Inter font, metadata
│   ├── not-found.tsx
│   └── globals.css          # Design tokens (@theme) and utilities
├── components/
│   ├── site/                # Public-site components
│   └── admin/               # Admin forms
├── lib/
│   ├── content/             # site.ts, experience.ts, stats.ts, fallback-projects.ts
│   ├── providers.tsx        # TanStack Query provider
│   ├── queries.ts           # Supabase queries
│   └── supabase.ts          # Supabase client
└── types/
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

## Design Tokens

Defined in `app/globals.css` under `@theme`:

| Role | Token | Value |
|---|---|---|
| Page canvas | `liquid-abyss` | `#012624` |
| Recessed surface (footer, CTA well) | `liquid-deep` | `#011d1c` |
| Raised card surface | `liquid-kelp` | `#003734` |
| Headings, nav | `platinum` | `#ffffff` |
| Emphasised text | `liquid-mist` | `#edfffe` |
| Body text | `silver-mist` | `#bbc7c6` |
| Muted text | `slate-deep` | `#707777` |
| Statistics | `lavender-phosphor` | `#fde9ff` |

The aurora gradient (`--gradient-aurora`) is reserved for the primary call to action. Legacy token names used by the admin dashboard (`primary`, `bg-dark`, `text`, …) are aliased to this palette.


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

### Update personal details, navigation and socials

Edit `lib/content/site.ts`.

### Update work experience, education and skills

Edit `lib/content/experience.ts`; both the home-page timeline and `/resume` read from it. Replace `public/resume.pdf` to update the downloadable CV.

### Update hero statistics

Edit `lib/content/stats.ts`.

### Modify the design tokens

Edit the `@theme` block in `app/globals.css`.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
