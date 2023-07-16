import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionTitle: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: Number, required: true },
    },
  ],
  subtitle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subtitle",
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
