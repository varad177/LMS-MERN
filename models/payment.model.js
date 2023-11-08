import { Schema, model } from "mongoose";

const paymentScmeha = new Schema(
  {
    razorpay_payment_id: {
      require: true,
      type: String,
    },
    razorpay_subcription_id: {
      require: true,
      type: String,
    },
    razorpay_signature: {
      require: true,
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);
const payment = model("Payment", paymentScmeha);
export default payment;
