import mongoose from "mongoose";

const subtitleSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  hours: {
    type: Number,
    default: 0,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  videos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Video",
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
});

const Subtitle = mongoose.model("Subtitle", subtitleSchema);

export default Subtitle;
