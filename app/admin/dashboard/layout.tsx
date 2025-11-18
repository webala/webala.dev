"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { loading, authenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Blog Posts",
      href: "/admin/dashboard/blog-posts",
      icon: FileText,
    },
    {
      name: "Projects",
      href: "/admin/dashboard/projects",
      icon: Briefcase,
    },
    {
      name: "Messages",
      href: "/admin/dashboard/messages",
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-bg-light border-r border-bg-lighter">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-bg-lighter">
            <Link href="/" className="text-xl font-bold text-text">
              <span className="text-primary">webala</span>·dev
            </Link>
            <p className="text-text-secondary text-sm mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-bg-dark hover:text-primary"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-bg-lighter">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-dark hover:text-red-500 transition-all duration-200 w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
