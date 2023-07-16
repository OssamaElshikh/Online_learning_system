import mongoose from "mongoose";

const requestCourseSchema = new mongoose.Schema({
  corporateTrainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CorporateTrainee",
  },
  corporateName: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "unseen",
  },
});

const RequestCourse = mongoose.model("RequestCourse", requestCourseSchema);

export default RequestCourse;
