import { NextResponse } from "next/server";
import { submitContactMessage, getMessages } from "@/actions/messageActions";

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json({ success: true, data: messages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitContactMessage(body);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: result.message, data: result.data });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
