"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/lib/queries";
import BlogCard from "@/components/BlogCard";
import { useState } from "react";
import { Search } from "lucide-react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => getBlogPosts(false),
  });

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-primary">Blog</span> Posts
          </h1>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-text-secondary text-lg max-w-2xl">
            Thoughts, tutorials, and insights about software engineering, web
            development, and technology.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
              size={20}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-bg-light border border-bg-lighter rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              Unable to load blog posts. Please check your Supabase
              configuration.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-bg-light rounded-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {searchTerm && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">
                  No posts found matching your search.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No blog posts yet. Add some posts to your Supabase database!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
