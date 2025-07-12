
import { NextResponse } from "next/server";

let payments = [
  { id: 1, upiId: "user@upi", amount: 500 },
];
// Handle GET requests
export async function GET() {
  return NextResponse.json(payments);
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const newPayment = { ...body, id: Date.now() };
  payments.push(newPayment);
  return NextResponse.json(newPayment, { status: 201 });
}





