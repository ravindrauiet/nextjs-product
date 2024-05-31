import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {id,sl_no,sales_purchase,date,party_name,details,weight,manpower,material,freight,maintainance,sales,payment_received,amount_paid,balance,createdAt} = await request.json();
  await connectMongoDB();
  await Topic.create({ id,sl_no,sales_purchase,date,party_name,details,weight,manpower,material,freight,maintainance,sales,payment_received,amount_paid,balance,createdAt });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}