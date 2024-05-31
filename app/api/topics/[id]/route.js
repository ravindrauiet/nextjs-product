import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
        sl_no,
        sales_purchase,
        date,
        party_name,
        details,
        weight,
        manpower,
        material,
        freight,
        maintainance,
        sales,
        payment_received,
        amount_paid,
        balance,
      } = await request.json();

    await connectMongoDB();

    const updatedTopic = await Topic.findByIdAndUpdate(id, {
      sl_no,
      sales_purchase,
      date,
      party_name,
      details,
      weight,
      manpower,
      material,
      freight,
      maintainance,
      sales,
      payment_received,
      amount_paid,
      balance
    }, { new: true }); // { new: true } to return the updated document

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findById(id);

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
