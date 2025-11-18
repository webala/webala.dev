import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: This middleware is simplified because Supabase stores sessions in localStorage
// The actual authentication protection happens client-side in the useAuth hook
export async function middleware(req: NextRequest) {
  // Just allow all admin routes through
  // The useAuth hook in the dashboard layout handles the actual authentication check
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
