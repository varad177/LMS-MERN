import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import RequiredAuth from "./components/Auth/RequiredAuth";
import CreateCourse from "./Pages/Course/CreateCourse";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/payment/Checkout";
import CheckOutSuccess from "./Pages/payment/CheckOutSuccess";
import CheckOutFail from "./Pages/payment/CheckOutFail";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import Addlecture from "./Pages/Dashboard/Addlecture";
import CourseUpdate from "./Pages/Course/CourseUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route element={<RequiredAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/courses/create" element={<CreateCourse />}></Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={["ADMIN" , "USER"]} />}>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckOutSuccess />}></Route>
          <Route path="/checkout/fail" element={<CheckOutFail />}></Route>
          <Route path="/course/displaylecture" element={<DisplayLectures />}></Route>
          <Route path="/course/addlecture" element={<Addlecture />}></Route>
          <Route path="/course/update" element={<CourseUpdate />}></Route>
        </Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
