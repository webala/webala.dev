import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatTech } from "@/lib/format";

function formatDate(value?: string) {
  if (!value) return "Draft";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:bg-kelp-hover/60">
      {post.cover_image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-liquid-abyss">
          <Image
            src={post.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-9">
        <div className="flex items-start justify-between gap-4">
          <p className="meta min-h-[1.4em] text-silver-mist">
            {(post.tags ?? []).slice(0, 3).map(formatTech).join(" · ")}
          </p>
          <span className="arrow-btn" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </span>
        </div>
        <h3 className="subheading mt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.5] text-silver-mist">
          {post.excerpt}
        </p>
        <p className="caption mt-7 text-slate-deep">
          {formatDate(post.published_at)}
          {post.reading_time ? ` · ${post.reading_time} min read` : ""}
        </p>
      </div>
    </article>
  );
}
