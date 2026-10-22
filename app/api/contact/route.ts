import { NextRequest, NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, company } = body;

    // Honeypot: real visitors never see this field. Pretend success so bots
    // don't learn they were filtered.
    if (typeof company === "string" && company.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Submit to Supabase
    const result = await submitContactMessage({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
