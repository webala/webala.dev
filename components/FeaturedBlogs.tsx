"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/lib/queries";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedBlogs() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-posts", "featured"],
    queryFn: () => getBlogPosts(true, 3),
  });

  if (error) {
    return null; // Silently fail if blog section isn't set up yet
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-light/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="text-text-secondary mb-2 uppercase tracking-wider text-sm">
              Blog
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-primary">Featured</span> Articles
            </h2>
            <div className="w-20 h-1 bg-primary mt-2"></div>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary-light transition-colors group"
          >
            <span>View All</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-bg-light rounded-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex justify-center mt-8 md:hidden">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors group"
              >
                <span>View All</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No blog posts yet. Add some featured posts to your Supabase
              database!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
