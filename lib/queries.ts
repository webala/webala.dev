import { supabase } from "./supabase";
import { Project, BlogPost, ContactMessage } from "@/types";

// Projects
export async function getProjects(featuredOnly = false) {
  let query = supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Project[];
}

// Blog Posts
export async function getBlogPosts(featuredOnly = false, limit?: number) {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) throw error;
  return data as BlogPost;
}

// Contact Messages
export async function submitContactMessage(message: ContactMessage) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([message])
    .select()
    .single();

  if (error) throw error;
  return data;
}
