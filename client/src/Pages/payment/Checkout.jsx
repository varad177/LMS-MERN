import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getRazorPayId,
  purchaseCourseBundle,
  varifyUserPayment,
} from "../../Redux/Slices/razorpaySlice";
import toast from "react-hot-toast";
import HomeLayouts from "../../Layouts/homeLayouts";

import { BiRupee } from "react-icons/bi";
const Checkout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);

  const subcription_id = useSelector(
    (state) => state?.razorpay?.subcription_id
  );

  const userData = useSelector((state) => state?.auth?.data);
  console.log(userData);
  const isPaymentVarified = useSelector(
    (state) => state?.razorpay?.isPaymentVarified
  );

  const paymentDetails = {
    id: userData._id,
    razorpay_payment_id: "",
    razorpay_subcription_id: "",
    razorpay_signature: "",
  };

  const handleSubcription = async (e) => {
    e.preventDefault();
    if (!razorpayKey || !!subcription_id) {
      toast.error("something went wrong");
    }

    const options = {
      key: razorpayKey,
      subscription_id: subcription_id,
      name: "Coursify Private Limited",
      description: "Subcription",
      theme: {
        color: "#F3725",
      },
      prefill: {
        email: userData.email,
        name: userData.fullname,
      },
      handler: async function (response) {
        (paymentDetails.razorpay_payment_id = response.razorpay_payment_id),
          (paymentDetails.razorpay_signature = response.razorpay_signature),
          (paymentDetails.razorpay_subcription_id = response.subscription_id);

        toast.success("payment successfully");

        const res = await dispatch(varifyUserPayment(paymentDetails));
        console.log(res);
        console.log(res);
        res?.payload?.success || isPaymentVarified
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const load = async () => {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle(userData._id));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayouts>
      <form
        onSubmit={handleSubcription}
        className="min-h-[90vh] flex items-center justify-center text-white "
      >
        <div className="w-80 h-[26rem] relative  flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subcription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center ">
            <p className="text-[17px] ">
              This purchase will allow you to access all available course of out
              platform for{" "}
              <span className="text-yellow-500 font-bold">
                <br />
                one year duration.{" "}
              </span>
              All the existing and new courses will be also available
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499 only</span>
            </p>
            <div className="text-grey-200">
              <p>100% refund on cancellation</p>
              <p>*Terms and conditions applied*</p>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-500 bottom-0 w-full absolute left-0 text-xl font-bold rounded-br-lg rounded-bl-lg py-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayouts>
  );
};

export default Checkout;
