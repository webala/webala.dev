"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/lib/queries";
import ArticleCard from "./ArticleCard";
import SectionHeader from "./SectionHeader";

export default function Articles() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts", "featured"],
    queryFn: () => getBlogPosts(true, 3),
    retry: 1,
  });

  // The writing section is optional — stay silent if the backend is unreachable.
  if (error) return null;

  return (
    <section
      id="writing"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="writing-heading"
    >
      <SectionHeader
        id="writing-heading"
        eyebrow="Writing"
        title="Notes from the build."
        description="Engineering write-ups on payments, performance and the systems behind the products."
        action={{ label: "All writing", href: "/blog" }}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="surface-card h-72 animate-pulse" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="surface-card p-9">
          <p className="subheading">First articles are in the works.</p>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-silver-mist">
            Payments integrations, Redis caching patterns and shipping Next.js
            at scale — follow along on LinkedIn or X to catch them when they land.
          </p>
        </div>
      )}
    </section>
  );
}
