"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogPostFormProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export default function BlogPostForm({ post, isEditing = false }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    cover_image: post?.cover_image || "",
    featured: post?.featured || false,
    published: post?.published || false,
    reading_time: post?.reading_time || 5,
    tags: post?.tags?.join(", ") || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image || null,
        featured: formData.featured,
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null,
        reading_time: formData.reading_time,
        tags: tagsArray,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && post) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id);

        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert([postData]);

        if (error) throw error;
      }

      router.push("/admin/dashboard/blog-posts");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    if (!isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({ ...formData, slug });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/blog-posts"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Posts
        </Link>
        <h1 className="text-3xl font-bold text-text mb-2">
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <p className="text-text-secondary">
          {isEditing ? "Update your article" : "Write and publish a new article"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-bg-light rounded-xl p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onBlur={generateSlug}
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="post-slug"
              required
              disabled={isEditing}
            />
            <p className="text-text-secondary text-sm mt-1">
              URL: /blog/{formData.slug || "post-slug"}
              {isEditing && " (slug cannot be changed)"}
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              rows={3}
              placeholder="Brief description of the post"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Content (Markdown) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
              rows={15}
              placeholder="Write your post content in markdown..."
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-text mb-2 font-medium">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) =>
                setFormData({ ...formData, cover_image: e.target.value })
              }
              className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Reading Time & Tags */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-text mb-2 font-medium">
                Reading Time (minutes)
              </label>
              <input
                type="number"
                value={formData.reading_time}
                onChange={(e) =>
                  setFormData({ ...formData, reading_time: parseInt(e.target.value) })
                }
                className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                min="1"
              />
            </div>

            <div>
              <label className="block text-text mb-2 font-medium">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full bg-bg-dark border border-bg-lighter text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="React, TypeScript, Web Dev"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 text-primary bg-bg-dark border-bg-lighter rounded focus:ring-primary"
              />
              <span className="text-text">Featured Post</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 text-primary bg-bg-dark border-bg-lighter rounded focus:ring-primary"
              />
              <span className="text-text">
                {isEditing ? "Published" : "Publish Immediately"}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Save size={20} />
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Post"
                : "Create Post"}
            </button>
            <Link
              href="/admin/dashboard/blog-posts"
              className="inline-flex items-center gap-2 bg-bg-dark hover:bg-bg-lighter text-text font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}


