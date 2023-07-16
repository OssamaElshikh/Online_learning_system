import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";

const individualTraineeSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,

  billingDetails: {
    masterCardNumber: String,
    expiryDate: Date,
    cvv: String,
    cardOwner: String,
  },
  phoneNumber: String,
  country: String,
  wallet: { type: Number, default: 0 },
  address: {
    city: String,
    streetName: String,
    streetNumber: String,
  },
  dateOfBirth: Date,
  university: String,
  gender: String,
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
      courseProgress: Number,
      finished: { type: Boolean, default: false },
    },
  ],
});

individualTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: "individualTrainee" },
    process.env.TOKEN_KEY,
    { expiresIn: "4h" }
  );
  return token;
};

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);

export default IndividualTrainee;
