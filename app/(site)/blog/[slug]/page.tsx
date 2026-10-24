import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/queries";
import { site } from "@/lib/content/site";
import ArticleBody from "@/components/site/ArticleBody";
import Button from "@/components/site/Button";
import type { BlogPost } from "@/types";

export const revalidate = 300;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getBlogPostBySlug(slug);
  } catch {
    return null;
  }
}

function formatDate(value?: string) {
  if (!value) return "Draft";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [site.name],
      tags: post.tags,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
    twitter: {
      card: post.cover_image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  return (
    <main className="container-site pb-24 pt-32 md:pt-40">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="nav-link inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
          All writing
        </Link>

        <header className="mt-10">
          {post.tags && post.tags.length > 0 && (
            <p className="eyebrow">{post.tags.join(" · ")}</p>
          )}
          <h1 className="heading-lg mt-5">{post.title}</h1>
          <p className="mt-6 text-xl leading-[1.5] text-silver-mist">
            {post.excerpt}
          </p>
          <p className="caption mt-6 text-slate-deep">
            {formatDate(post.published_at)}
            {post.reading_time ? ` · ${post.reading_time} min read` : ""}
            {` · ${site.name}`}
          </p>

          {post.cover_image && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-card bg-liquid-kelp">
              <Image
                src={post.cover_image}
                alt=""
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="mt-12 border-t border-white/10 pt-10">
          <ArticleBody content={post.content} />
        </div>

        <footer className="recessed mt-16 flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow">Enjoyed this?</p>
            <p className="subheading mt-3">Let&rsquo;s talk about your system.</p>
          </div>
          <Button href="/#contact" variant="gradient">
            Get in touch
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </footer>
      </article>
    </main>
  );
}
