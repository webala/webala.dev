"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isAuthorizedAdmin } from "@/lib/auth-utils";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setAuthenticated(false);
        router.push("/admin/login");
      } else if (event === "SIGNED_IN" && session) {
        // Verify admin access
        const userEmail = session.user.email;
        if (!isAuthorizedAdmin(userEmail)) {
          console.error("Unauthorized access attempt by:", userEmail);
          await supabase.auth.signOut();
          setAuthenticated(false);
          router.push("/admin/login?error=unauthorized");
          return;
        }
        setAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Verify admin access
        const userEmail = session.user.email;
        if (!isAuthorizedAdmin(userEmail)) {
          console.error("Unauthorized access attempt by:", userEmail);
          await supabase.auth.signOut();
          setAuthenticated(false);
          router.push("/admin/login?error=unauthorized");
          return;
        }
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setAuthenticated(false);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  return { loading, authenticated };
}
