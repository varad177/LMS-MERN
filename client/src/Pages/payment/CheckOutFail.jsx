import React from "react";
import HomeLayouts from "../../Layouts/homeLayouts";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

const CheckOutFail = () => {
  return (
    <HomeLayouts>
      <div className="flex min-h-[90vh] justify-center items-center text-white ">
        <div className="w-80 h-[26rem] justify-center items-center flex flex-col shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 text-center absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment Successfull
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">OPPS ! Payment Failed </h2>
              <p className=" text-center ">Please try again later</p>
            </div>
            <RxCrossCircled className="text-red-500 text-5xl" />
          </div>
          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 bottom-0 w-full py-2 text-xl font-bold text-white text-center rounded-br-lg absolute rounded-bl-lg"
          >
            <button>Try Again</button>
          </Link>
        </div>
      </div>
    </HomeLayouts>
  );
};

export default CheckOutFail;
