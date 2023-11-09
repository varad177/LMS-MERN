import React, { useState } from "react";
import HomeLayouts from "../Layouts/homeLayouts";
import toast from "react-hot-toast";
import axiosinstance from "../helpers/axiosInstance";
import axios from "axios";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are Required");
      return;
    }
    if (
      !userInput.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Envalid email Id");
      return;
    }

    try {
      await axiosinstance.post("/user/contact", userInput);

      toast.success("message send successfully");

      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast(error.message);
    }
  };
  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-5 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold ">Contact Form</h1>
          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="name" className="text-lg font-semibold ">
              Name
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm "
              id="name"
              name="name"
              placeholder="Enter Your Name"
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="email" className="text-lg font-semibold ">
              Email
            </label>
            <input
              value={userInput.email}
              onChange={handleInputChange}
              type="email"
              className="bg-transparent border px-2 py-1 rounded-sm "
              id="email"
              name="email"
              placeholder="Enter Your email"
            />
          </div>

          <div className="flex flex-col w-full gap-1 ">
            <label htmlFor="message" className="text-lg font-semibold ">
              Message
            </label>
            <textarea
              value={userInput.message}
              onChange={handleInputChange}
              className="bg-transparent resize-none h-40 border px-2 py-1 rounded-sm "
              id="message"
              name="message"
              placeholder="Enter Your message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayouts>
  );
};

export default Contact;
