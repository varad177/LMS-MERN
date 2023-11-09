import React from "react";
import HomeLayouts from "../Layouts/homeLayouts";
import { Link } from "react-router-dom";
import HomeImage from '../../Assets/homePageMainImage.png'
const HomePage = () => {
  return (
    <HomeLayouts>
      <div className="pt-10 text-white flex flex-row items-center justify-center gap-10 mx-12 h-[90vh] max-[800px]:flex-col ">
        <div className="w-1/2 space-y-6 max-[800px]:w-[90%] mt-12  ">
          <h1 className="text-5xl font-semibold ">
            Find out Best
            <span className=" text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">we have a latest library of courses tought by highly skilled and qualified faculties at a very affordable cost</p>
          <div className="space-x-6 max-[800px]:flex flex-col gap-3">
            <Link to="/courses">
                <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Explore Courses</button>
            </Link>
            <Link to="/contact">
                <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Contact Us</button>
            </Link>
          </div>

        </div>
        <div className="w-1/2 flex items-center justify-center max-[800px]:hidden">
            <img src={HomeImage} alt="home page image"  />
        </div>

      </div>
    </HomeLayouts>
  );
};

export default HomePage;
