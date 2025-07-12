import { NextResponse } from "next/server";

// Fake in-memory database for classes
let classes = [
  { id: 1, name: "Mathematics", teacher: "Alice Johnson" },
  { id: 2, name: "Science", teacher: "John Smith" },
  { id: 3, name: "English", teacher: "Mary Davis" },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(classes);
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const newClass = { ...body, id: Date.now() };
  classes.push(newClass);
  return NextResponse.json(newClass, { status: 201 });
}

// Handle DELETE requests
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  classes = classes.filter((c) => c.id !== id);
  return NextResponse.json({ success: true });
}
