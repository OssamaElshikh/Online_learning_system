import mongoose from "mongoose";

const reportedProblemSchema = new mongoose.Schema({
  individualTrainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IndividualTrainee",
  },
  corporateTrainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CorporateTrainee",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  problem: {
    type: String,
  },
  problemType: {
    type: String,
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

const ReportedProblem = mongoose.model(
  "ReportedProblem",
  reportedProblemSchema
);

export default ReportedProblem;
