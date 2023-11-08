import { Router } from "express";
import {
  allPayments,
  buySubcription,
  cancleSubcription,
  getRazorpayApiKey,
  varifySubcription,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/razorpay-key").get(  getRazorpayApiKey);

router.route("/subscribe/:id").post( buySubcription);

router.route("/verify").post( varifySubcription);

router.route("/unSubcription").post( cancleSubcription);

router.route("/").get(isLoggedIn, authorizedRoles("ADMIN") , allPayments);

export default router;
