"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { getBlogPosts } from "@/lib/queries";
import ArticleCard from "@/components/site/ArticleCard";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => getBlogPosts(false),
    retry: 1,
  });

  const term = searchTerm.trim().toLowerCase();
  const filteredPosts = posts?.filter(
    (post) =>
      !term ||
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(term))
  );

  return (
    <main className="container-site pb-24 pt-32 md:pt-40">
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[40ch]">
          <p className="eyebrow">Writing</p>
          <h1 className="heading-lg mt-5">Notes from the build.</h1>
          <p className="mt-5 max-w-[52ch] text-silver-mist">
            Thoughts, tutorials and post-mortems on software engineering, web
            development and the systems that move money.
          </p>
        </div>
        <div className="relative w-full md:max-w-sm">
          <label htmlFor="blog-search" className="sr-only">
            Search posts
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-deep"
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            placeholder="Search posts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="field !pl-11"
          />
        </div>
      </div>

      {error ? (
        <div className="surface-card p-9">
          <p className="subheading">Writing is temporarily unavailable.</p>
          <p className="mt-3 text-[15px] text-silver-mist">
            Please try again in a moment.
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="surface-card h-72 animate-pulse" />
          ))}
        </div>
      ) : filteredPosts && filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div key={post.id} className="relative">
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <p className="text-silver-mist">No posts match “{searchTerm}”.</p>
      ) : (
        <div className="surface-card p-9">
          <p className="subheading">First articles are in the works.</p>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-silver-mist">
            Payments integrations, Redis caching patterns and shipping Next.js
            at scale — check back soon.
          </p>
        </div>
      )}
    </main>
  );
}
