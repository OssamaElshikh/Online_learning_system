import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";

const instructorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  wallet: { type: Number, default: 0 },
  dateOfBirth: Date,
  country: String,
  gender: String,
  rating: { type: Number, default: 0 },
  ratingsAndReviews: [
    {
      corporateTrainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTrainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      rating: Number,
      review: String,
    },
  ],

  biography: String,
  firstLogin: { type: Boolean, default: true },
});

instructorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: "instructor" },
    process.env.TOKEN_KEY,
    { expiresIn: "4h" }
  );
  return token;
};

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
