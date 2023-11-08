import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import crypto from "crypto";

export const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay API Key",
    key: process.env.ROZORPAY_KEY_ID,
  });
};

export const buySubcription = async (req, res, next) => {
  try {
    const { id } = req.params;

    // console.log("the is is ",id);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "unthorised user , please login",
      });
    }

    if (user.role === "ADMIN") {
      return res.status(400).json({
        success: false,
        message: "ADMIN cannot buy subcription",
      });
    }

    let subcription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 6,
    });

    user.subscription.id = subcription?.id;
    user.subscription.status = subcription?.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "subcribed successfully",
      subcription_id: subcription?.id,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const varifySubcription = async (req, res, next) => {
  try {
    const {
      id,
      razorpay_payment_id,

      razorpay_subcription_id,

      razorpay_signature,
    } = req.body;

    console.log(
      id,
      razorpay_payment_id,
      razorpay_subcription_id,
      razorpay_signature
    );
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "unthorised user , please login",
      });
    }

    const subcriptionId = user.subscription.id;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.ROZORPAY_SECRETE)
      .update(`${razorpay_payment_id}|${subcriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "payment not varified, please try again",
      });
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_subcription_id,
      razorpay_signature,
    });

    user.subscription.status = "active";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "payment varified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancleSubcription = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(id);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "unthorised user , please login",
      });
    }

    if (user.role === "ADMIN") {
      return res.status(400).json({
        success: false,
        message: "ADMIN cannot cancle subcription",
      });
    }

    const subcriptionId = await user.subscription.id;
    const subcription = await razorpay.subscriptions.cancel(subcriptionId);

    user.subscription.status = subcription.status;

    await user.save();
    res.status(200).json({
      success: true,
      message: 'Unsubscibed successfully',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subcriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      subcriptions,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
