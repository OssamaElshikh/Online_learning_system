import mongoose from "mongoose";
import Instructor from "../models/instructor.js";
import Video from "../models/video.js";
import Subtitle from "../models/subtitle.js";
import Course from "../models/course.js";
import Exercise from "../models/exercise.js";
import IndividualTrainee from "../models/individualTrainee.js";
import CorporateTrainee from "../models/corporateTrainee.js";

export const getInstructor = async (req, res) => {
  try {
    const { id } = req.query;

    const instructor = await Instructor.findById(id);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorNoID = async (req, res) => {
  try {
    const id = req.userid;

    const instructor = await Instructor.findById(id);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const id = req.userid;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });
    const instructor = await Instructor.findById(id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    const { title, subject, price, summary, subtitles, previewVideo } =
      req.body;

    const createCourse = await Course.create({
      title,
      subject,
      price,
      summary,
      previewVideo,
      "instructor.name": instructor.firstName + " " + instructor.lastName,
      "instructor.id": instructor._id,
    });
    instructor.courses.push(createCourse._id);
    await instructor.save();
    let courseHours = 0;
    const createdSubtitles = [];
    for (let i = 0; i < subtitles.length; i++) {
      const videos = subtitles[i].videos;
      const exercises = subtitles[i].exercises;

      const createdVideos = [];
      const createdExercises = [];
      let totalHours = 0;
      const subtitle = await Subtitle.create({
        title: subtitles[i].title,
        course_id: createCourse._id,
      });
      for (let j = 0; j < videos.length; j++) {
        totalHours += Number(videos[j].duration);
        courseHours += Number(videos[j].duration);
        const video = await Video.create({
          title: videos[j].title,
          url: videos[j].url,
          duration: Number(videos[j].duration),
          description: videos[j].description,
          subtitle_id: subtitle._id,
        });

        createdVideos.push(video._id);
      }
      for (let j = 0; j < exercises.length; j++) {
        console.log(exercises[j].questions);
        totalHours += exercises[j].questions.length;
        courseHours += exercises[j].questions.length;
        console.log(totalHours);
        const exercise = await Exercise.create({
          title: exercises[j].title,
          questions: exercises[j].questions,
          subtitle_id: subtitle._id,
        });
        console.log(exercise);
        createdExercises.push(exercise._id);
      }
      console.log(totalHours);
      totalHours /= 60;
      subtitle.hours = totalHours;
      subtitle.videos = createdVideos;
      subtitle.exercises = createdExercises;

      await subtitle.save();
      createdSubtitles.push(subtitle._id);
    }
    console.log(courseHours);
    courseHours /= 60;
    createCourse.hours = courseHours;
    createCourse.subtitles = createdSubtitles;
    await createCourse.save();
    return res.status(200).json({ createCourse });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const definePromotion = async (req, res) => {
  try {
    const { courseId, discount, startDate, endDate } = req.query;
    const castedCourseId = mongoose.Types.ObjectId(courseId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    course.discount = {
      value: discount / 100,
      startDate: start,
      endDate: end,
    };
    await course.save();
    return res.status(200).json({ course });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRating = async (req, res) => {
  try {
    const { rating, review, instructorId, userId } = req.query;
    const instructor = await Instructor.findById(instructorId);
    const individualTrainee = await IndividualTrainee.findById(userId);
    if (!individualTrainee) {
      const corporateTrainee = CorporateTrainee.findById(userId);
      if (!corporateTrainee)
        return res.status(404).json({ message: "User not found" });
      else {
        //check if already rated Before
        let done = false;
        for (let i = 0; i < instructor.ratingsAndReviews.length; i++) {
          if (instructor.ratingsAndReviews[i].corporateTrainee) {
            if (
              instructor.ratingsAndReviews[i].corporateTrainee.toString() ===
              userId.toString()
            ) {
              instructor.ratingsAndReviews[i].rating = rating;
              instructor.ratingsAndReviews[i].review = review;
              done = true;
            }
          }
        }
        let sum = 0;

        if (!done) {
          instructor.ratingsAndReviews.push({
            corporateTrainee: userId,
            rating: rating,
            review: review,
          });
        }
        for (let i = 0; i < instructor.ratingsAndReviews.length; i++) {
          sum += instructor.ratingsAndReviews[i].rating;
        }
        instructor.rating = (sum / instructor.ratingsAndReviews.length).toFixed(
          1
        );
        await instructor.save();
        return res.status(200).json(instructor);
      }
    } else {
      //check if already rated Before
      let done = false;
      for (let i = 0; i < instructor.ratingsAndReviews.length; i++) {
        if (instructor.ratingsAndReviews[i].individualTrainee) {
          if (
            instructor.ratingsAndReviews[i].individualTrainee.toString() ===
            userId.toString()
          ) {
            instructor.ratingsAndReviews[i].rating = rating;
            instructor.ratingsAndReviews[i].review = review;
            done = true;
          }
        }
      }
      let sum = 0;

      if (!done) {
        instructor.ratingsAndReviews.push({
          individualTrainee: userId,
          rating: rating,
          review: review,
        });
      }
      for (let i = 0; i < instructor.ratingsAndReviews.length; i++) {
        sum += instructor.ratingsAndReviews[i].rating;
      }
      instructor.rating = (sum / instructor.ratingsAndReviews.length).toFixed(
        1
      );
      await instructor.save();
      return res.status(200).json(instructor);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorCoursesFiltered = async (req, res) => {
  try {
    let courses;
    let { price, rating, subject, search } = req.query;
    price = price.split(",");
    price = price.map((p) => Number(p));
    rating = rating.split(",");
    rating = rating.map((r) => Number(r));
    let filter = {};

    if (!(price[0] === 0 && price[1] === 1000)) {
      filter["price"] = { $gte: price[0], $lte: price[1] };
    }

    if (!(rating[0] === 0 && rating[1] === 5)) {
      filter["rating"] = { $gte: rating[0], $lte: rating[1] };
    }
    if (subject !== "null" && subject.trim()) {
      filter["subject"] = subject;
    }

    if (search === "null" || !search.trim()) {
      courses = await Course.find(filter).and({ "instructor.id": req.userid });
    } else {
      courses = await Course.find(filter)
        .or([
          { title: { $regex: search, $options: "i" } },
          { "instructor.name": { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
        ])
        .and({ "instructor.id": req.userid });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRatingsAndReviews = async (req, res) => {
  try {
    const { instructorId } = req.query;
    const instructor = await Instructor.findById(instructorId)
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "individualTrainee" },
      })
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "corporateTrainee" },
      });
    const ratingsAndReviews = instructor.ratingsAndReviews;
    res.status(200).json(ratingsAndReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editInstructorProfile = async (req, res) => {
  try {
    const { email, biography } = req.body;
    console.log(req.body);
    console.log(email, biography);
    const instructor = await Instructor.findById(req.userid);
    if (!instructor) return res.status(404).json({ message: "User not found" });
    if (email) {
      const valid = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (!valid) return res.status(400).json({ message: "Invalid email" });
      instructor.email = email.toLowerCase();
    }
    if (biography) instructor.biography = biography;
    await instructor.save();
    return res.status(200).json({ instructor });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
