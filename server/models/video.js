import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: false,
  },
  subtitle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subtitle",
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
