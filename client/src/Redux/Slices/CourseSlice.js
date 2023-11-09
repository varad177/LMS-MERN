import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosinstance from "../../helpers/axiosInstance";
import axios from "axios";

const url= "";

const initialState = {
  courseData: [],
};

export const getAllCourse = createAsyncThunk("/courses", async () => {
  try {
    const res = axios.get(`/${url}/course/`);
     console.log("the courses are ",(await res).data.course);
    toast.promise(res, {
      loading: "Loading course data..",
      success: "Course loaded successfully",
      error: "Failed to get courses",
    });

    return (await res).data.course;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk("/course/create" , async(data)=>{
  try {
    
    let formdata = new FormData();
    formdata.append("title" , data?.title)
    formdata.append("description" , data?.description)
    formdata.append("category" , data?.category)
    formdata.append("thumbnail" , data?.thumbnail)
    formdata.append("createdBy" , data?.createdBy)

    const res = axiosinstance.post("/course/" , formdata);
    toast.promise(res , {
      loading :"creating new course",
      success :"course created successfully",
      error :"failed to create course"
    });

    return (await res).data

  } catch (error) {
    toast.error(error?.response?.data?.message);
    
  }
})



export const deleteCourse = createAsyncThunk(
  "/course/delete",
  async (id) => {
    try {
      console.log("the id " , id);
      const res = axiosinstance.delete(`/course/${id}`);

      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Course deleted successfully",
        error: "Failed to delete course",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);


export const updateCourse = createAsyncThunk(
  "/course/update",
  async (data) => {
    try {
      
      
      const res = axiosinstance.put(`/course/${data.id}`, {
        title: data.title,
        category: data.category,
        createdBy: data.createdBy,
        description: data.description,
      });

      toast.promise(res, {
        loading: "Updating the course...",
        success: "Course updated successfully",
        error: "Failed to update course",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);





const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourse.fulfilled, (state , action)=>{
        if(action.payload){
            console.log("the courses",action);
            state.courseData=[...action.payload];
        }
    })
  },
});

export default courseSlice.reducer;
