import { NextResponse } from "next/server";
// Supabase sessions are stored client-side; admin auth is enforced by useAuth.
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
