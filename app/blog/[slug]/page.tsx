"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/lib/queries";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });

  if (error) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-text-secondary mb-8">
            The blog post you're looking for doesn't exist or check your
            Supabase configuration.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-bg-light rounded-lg h-96 animate-pulse"></div>
        </div>
      </main>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </Link>

        {/* Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-text-muted text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Draft"}
                </span>
              </div>
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-bg-light text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Cover Image */}
            {post.cover_image && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className="text-3xl font-bold mt-8 mb-4 text-text"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="text-2xl font-bold mt-8 mb-4 text-text"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="text-xl font-bold mt-6 mb-3 text-text"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    className="text-text-secondary mb-4 leading-relaxed"
                    {...props}
                  />
                ),
                a: ({ ...props }) => (
                  <a
                    className="text-primary hover:text-primary-light underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ ...props }) => (
                  <code
                    className="bg-bg-light text-primary px-2 py-1 rounded text-sm"
                    {...props}
                  />
                ),
                pre: ({ ...props }) => (
                  <pre
                    className="bg-bg-light p-4 rounded-lg overflow-x-auto mb-4"
                    {...props}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul
                    className="list-disc list-inside mb-4 text-text-secondary space-y-2"
                    {...props}
                  />
                ),
                ol: ({ ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-4 text-text-secondary space-y-2"
                    {...props}
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 italic text-text-secondary my-4"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
