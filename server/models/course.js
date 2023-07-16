import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  n_enrolled: {
    type: Number,
    required: false,
    default: 0,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  discount: {
    type: {
      value: {
        type: Number,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
  },
  hours: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
  },
  instructor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    name: { type: String, required: true },
  },

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

  subtitles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subtitle",
  },
  previewVideo: {
    type: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
