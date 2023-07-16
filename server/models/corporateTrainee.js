import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";

const corporateTraineeSchema = mongoose.Schema({
  corporateName: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,

  phoneNumber: String,
  country: String,
  address: {
    city: String,
    streetName: String,
    streetNumber: String,
  },
  dateOfBirth: Date,
  university: String,
  myCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      coursePrice: Number,
      solvedExercises: [
        {
          exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
          grade: { type: Number, default: 0 },
        },
      ],
      watchedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
      takenNotes: [
        {
          videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
          notes: [String],
        },
      ],
      courseProgress: { type: Number, default: 0 },
      finished: { type: Boolean, default: false },
    },
  ],
});

corporateTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: "corporateTrainee" },
    process.env.TOKEN_KEY,
    { expiresIn: "4h" }
  );
  return token;
};

const CorporateTrainee = mongoose.model(
  "CorporateTrainee",
  corporateTraineeSchema
);

export default CorporateTrainee;
