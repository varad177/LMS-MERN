import React, { useEffect, useState } from "react";
import HomeLayouts from "../../Layouts/homeLayouts";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LecturesSlice";

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lectures);
  const { role } = useSelector((state) => state.auth);
  console.log(lectures, role);

  const [currVideo, setcurrVideo] = useState(0);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }

    dispatch(getCourseLectures(state?._id));
  }, []);

  const onLectureDelete = async (courseid, lectureid) => {
    await dispatch(
      deleteCourseLectures({ courseid: courseid, lectureid: lectureid })
    );
    await dispatch(getCourseLectures(courseid));
  };

  return (
    <HomeLayouts>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] mx-[5%] py-0 text-white">
        <div className="text-center text-4xl font-semibold text-yellow-500 max-[800px]:mt-8">
          Course Name : {state.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col items-center  justify-center gap-10 w-full md:flex-row ">
            <div className="space-y-5 w-[90%] p-2 rounded-lg shadow-[0_0_10px_black] md:w-[40%]">
              <video
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                src={state && lectures[currVideo]?.lecture?.secure_url}
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500 ">Title </span>{" "}
                  {lectures && lectures[currVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500">Description </span>{" "}
                  {lectures && lectures[currVideo]?.description}
                </p>
              </div>
            </div>
            <ul className="w-[90%] p-2 rounded-lg shadow-[0_0_10px_black] space-y-5 md:w-[40%]">
              <li className="font-semibold  text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2 " key={lecture?._id}>
                      <p
                        onClick={() => setcurrVideo(idx)}
                        className="cursor-pointer"
                      >
                        <span> Lecture {idx + 1} </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn-accent px-2 py-1 rounded-md font-semibold"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl">Lectures will be added soon</h1>
            <div className="m-auto my-6">
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: { ...state } })
                  }
                  className="btn-primary m-auto px-2 py-1 rounded-md font-semibold"
                >
                  Add New Lecture
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </HomeLayouts>
  );
};

export default DisplayLectures;
