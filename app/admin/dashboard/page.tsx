"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FileText, Briefcase, Mail, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogPosts: 0,
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogPosts, projects, messages] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact" }),
      ]);

      setStats({
        blogPosts: blogPosts.count || 0,
        projects: projects.count || 0,
        messages: messages.count || 0,
        unreadMessages:
          messages.data?.filter((m) => !m.read).length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      href: "/admin/dashboard/blog-posts",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: Briefcase,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      href: "/admin/dashboard/projects",
    },
    {
      title: "Total Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      href: "/admin/dashboard/messages",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/admin/dashboard/messages",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Dashboard Overview
        </h1>
        <p className="text-text-secondary">
          Welcome back! Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-bg-light rounded-xl p-6 h-32 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-bg-light rounded-xl p-6 hover:bg-bg-lighter transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} p-3 rounded-lg`}>
                    <Icon className={card.color} size={24} />
                  </div>
                </div>
                <h3 className="text-text-secondary text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-text">{card.value}</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard/blog-posts/new"
            className="bg-bg-light rounded-xl p-6 hover:bg-bg-lighter transition-all duration-200 group"
          >
            <FileText
              className="text-primary mb-4 group-hover:scale-110 transition-transform"
              size={32}
            />
            <h3 className="text-lg font-bold text-text mb-2">
              Create Blog Post
            </h3>
            <p className="text-text-secondary text-sm">
              Write and publish a new blog post
            </p>
          </Link>

          <Link
            href="/admin/dashboard/projects/new"
            className="bg-bg-light rounded-xl p-6 hover:bg-bg-lighter transition-all duration-200 group"
          >
            <Briefcase
              className="text-primary mb-4 group-hover:scale-110 transition-transform"
              size={32}
            />
            <h3 className="text-lg font-bold text-text mb-2">Add Project</h3>
            <p className="text-text-secondary text-sm">
              Showcase your latest work
            </p>
          </Link>

          <Link
            href="/admin/dashboard/messages"
            className="bg-bg-light rounded-xl p-6 hover:bg-bg-lighter transition-all duration-200 group"
          >
            <Mail
              className="text-primary mb-4 group-hover:scale-110 transition-transform"
              size={32}
            />
            <h3 className="text-lg font-bold text-text mb-2">View Messages</h3>
            <p className="text-text-secondary text-sm">
              Check your contact form submissions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}


