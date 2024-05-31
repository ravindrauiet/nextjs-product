import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    id: String,
    sl_no: String,
    sales_purchase: String,
    date: String,
    party_name: String,
    details: String,
    weight: String,
    manpower: String,
    material: String,
    freight: String,
    maintainance: String,
    sales: String,
    payment_received: String,
    amount_paid: String,
    balance: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;