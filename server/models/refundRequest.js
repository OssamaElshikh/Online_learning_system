import mongoose from "mongoose";

const refundRequestSchema = new mongoose.Schema({
  individualTrainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IndividualTrainee",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  status: {
    type: String,
    default: "unseen",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const RefundRequest = mongoose.model("RefundRequest", refundRequestSchema);

export default RefundRequest;
