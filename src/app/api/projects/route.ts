import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/actions/projectActions";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createProject(body);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: result.project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
