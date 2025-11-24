import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;


    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use Supabase REST API directly (no RLS, so this will work)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration missing");
    }


    const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Supabase error:", errorData);
      throw new Error(errorData.message || "Failed to insert contact message");
    }

    const result = await response.json();

    return NextResponse.json({ success: true, data: result[0] }, { status: 200 });
  } catch (error: any) {
    // console.error("Error submitting contact message:", {
    //   message: error?.message,
    //   fullError: error,
    // });
    return NextResponse.json(
      { error: "Failed to submit message", details: error?.message },
      { status: 500 }
    );
  }
}
