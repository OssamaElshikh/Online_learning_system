import mongoose from "mongoose";
import Course from "../models/course.js";
import IndividualTrainee from "../models/individualTrainee.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import Instructor from "../models/instructor.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({ path: "subtitles", populate: { path: "videos" } })
      .populate({ path: "subtitles", populate: { path: "exercises" } });

    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCoursesFiltered = async (req, res) => {
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
      courses = await Course.find(filter);
    } else {
      courses = await Course.find(filter).or([
        { title: { $regex: search, $options: "i" } },
        { "instructor.name": { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ]);
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  const { id } = req.query;
  try {
    const castedId = mongoose.Types.ObjectId(id);
    const course = await Course.findById(castedId)
      .populate({ path: "subtitles", populate: { path: "videos" } })
      .populate({ path: "subtitles", populate: { path: "exercises" } });
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ "instructor.id": req.userid });
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPopularCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ n_enrolled: -1 }).limit(12);
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const enrollTrainee = async (req, res) => {
  const { courseId, traineeId, price, instructorId } = req.query;
  try {
    //check whether individual or corporate

    const traineeCastedId = mongoose.Types.ObjectId(traineeId);
    const individualTrainee = await IndividualTrainee.findById(traineeCastedId);
    const courseCastedId = mongoose.Types.ObjectId(courseId);
    const course = await Course.findById(courseCastedId);

    if (!individualTrainee) {
      const corporateTrainee = await CorporateTrainee.findById(traineeCastedId);
      if (!corporateTrainee) {
        res.status(404).json({ message: "Trainee not found" });
      } else {
        //check if the trainee is already enrolled
        const foundCourse = corporateTrainee.myCourses.find(
          (course) => course.courseId === courseId
        );
        if (foundCourse) {
          res.status(404).json({ message: "Trainee already enrolled" });
        } else {
          //enroll the trainee
          corporateTrainee.myCourses.push({ courseId: courseId });
          await corporateTrainee.save();
          course.n_enrolled += 1;
          await course.save();

          res.status(200).json(corporateTrainee);
        }
      }
    } else {
      //check if the trainee is already enrolled
      const foundCourse = individualTrainee.myCourses.find(
        (course) => course.courseId === courseId
      );
      if (foundCourse) {
        res.status(404).json({ message: "Trainee already enrolled" });
      } else {
        //enroll the trainee
        individualTrainee.myCourses.push({
          courseId: courseId,
          coursePrice: price,
        });

        course.n_enrolled += 1;
        await course.save();
        await individualTrainee.save();
        const instructor = await Instructor.findById(instructorId);
        instructor.wallet += 0.86 * price;
        await instructor.save();
        res.status(200).json(individualTrainee);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const refundCourse = async (req, res) => {
  const { courseId, traineeId } = req.query;
  try {
    //check whether individual or corporate
    let price = 0;
    const traineeCastedId = mongoose.Types.ObjectId(traineeId);
    const individualTrainee = await IndividualTrainee.findById(traineeCastedId);
    if (!individualTrainee) {
      res.status(404).json({ message: "Trainee not found" });
    } else {
      //check if the trainee is already enrolled
      const course = individualTrainee.myCourses.find(
        (course) => course.courseId === courseId
      );
      price = course.coursePrice;
      if (!course) {
        res.status(404).json({ message: "Trainee not enrolled" });
      } else {
        //refund the trainee
        individualTrainee.myCourses = individualTrainee.myCourses.filter(
          (course) => course.courseId !== courseId
        );
        individualTrainee.wallet += price;
        await individualTrainee.save();
        res.status(200).json(individualTrainee);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRatingsAndReviews = async (req, res) => {
  try {
    console.log("getRatingsAndReviews");
    console.log(req.query);
    const { courseId } = req.query;
    const course = await Course.findById(courseId)
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "individualTrainee" },
      })
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "corporateTrainee" },
      });
    const ratingsAndReviews = course.ratingsAndReviews;
    res.status(200).json(ratingsAndReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
