import { BlogPost } from "@/types";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-bg-light rounded-lg overflow-hidden hover:bg-bg-lighter transition-all duration-300 hover:scale-105 group cursor-pointer">
        {post.cover_image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-text text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Draft"}
              </span>
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.reading_time} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-bg-dark text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
