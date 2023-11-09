import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayouts from "../../Layouts/homeLayouts";
import CourseCard from "../../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  const loadCourses = async () => {
    await dispatch(getAllCourse());
  };

  const userData = useSelector((state) => state?.auth?.data);

  useEffect(() => {
    loadCourses();
    console.log("vdjg");
  }, []);

  const navigate = useNavigate();

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white max-[800px]:p-4">
        <h1 className="text-center text-3xl font-semibold mb-5 max-[800px]:mt-8">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Expert</span>
        </h1>
        {userData.role === "ADMIN" && (
          <div className="w-full flex items-center justify-center">
            <Link
              to={"/courses/create"}
              className="w-full flex justify-center items-center md:w-[60%]"
            >
              <button className="btn w-[90%] text-2xl  btn-primary">Add Course</button>
            </Link>
          </div>
        )}
        <div className="mb-10 flex flex-wrap justify-evenly gap-14 ">
          {courseData.map((ele) => {
            return <CourseCard key={ele._id} data={ele} />;
          })}
        </div>
      </div>
    </HomeLayouts>
  );
};

export default CourseList;
