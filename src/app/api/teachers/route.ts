import { NextResponse } from "next/server";

let teachers = [
  { id: 1, name: "Alice Johnson", subject: "Math", email: "alice@school.com" },
  { id: 2, name: "John Smith", subject: "Science", email: "john@school.com" },
];

export async function GET() {
  return NextResponse.json(teachers);
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const newTeacher = { ...body, id: Date.now() };
  teachers.push(newTeacher);
  return NextResponse.json(newTeacher, { status: 201 });
}
