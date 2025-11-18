"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err: any) {
      console.error("Error fetching post:", err);
      setError(err.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || "Post not found"}</p>
        <a
          href="/admin/dashboard/blog-posts"
          className="text-primary hover:underline"
        >
          Back to Posts
        </a>
      </div>
    );
  }

  return <BlogPostForm post={post} isEditing />;
}


