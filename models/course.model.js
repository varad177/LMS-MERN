import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      require : [true , "Title is required"],
      minLength : [4 , "title should be of minimum 4 character"],
      maxLength : [15 , "title should be of maximum 15 character"],
      trim : true,
    },
    description: {
      type: String,
      require : [true , "description is required"],
      minLength : [8 , "description should be of minimum 8 character"],
      
    },
    category: {
      type: String,
      require : true,
    },
    thumbnail: {
      public_id: {
        type: String,
        require : true,
      },
      secure_url: {
        type: String,
        require : true,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default : 0,
    },
    createdBy: {
      type: String,
      require : true,
    },
  },
  {
    timestamps: true,
  }
);


const Course = model('Course' , courseSchema);
export default Course;