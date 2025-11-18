"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
} from "lucide-react";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setDeleting(id);
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ published: !post.published })
        .eq("id", post.id);

      if (error) throw error;

      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Blog Posts</h1>
          <p className="text-text-secondary">
            Manage your blog posts and articles
          </p>
        </div>
        <Link
          href="/admin/dashboard/blog-posts/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-bg-light rounded-xl p-6 h-32 animate-pulse"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-bg-light rounded-xl">
          <p className="text-text-secondary mb-4">No blog posts yet</p>
          <Link
            href="/admin/dashboard/blog-posts/new"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Plus size={20} />
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-bg-light rounded-xl p-6 hover:bg-bg-lighter transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-text">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
                        FEATURED
                      </span>
                    )}
                    <button
                      onClick={() => togglePublished(post)}
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        post.published
                          ? "bg-green-500/20 text-green-500"
                          : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {post.published ? "PUBLISHED" : "DRAFT"}
                    </button>
                  </div>
                  <p className="text-text-secondary mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {post.reading_time && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.reading_time} min read
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/dashboard/blog-posts/edit/${post.id}`}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-bg-dark rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-bg-dark rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


