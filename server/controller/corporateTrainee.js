import mongoose from "mongoose";
import RequestCourse from "../models/requestCourse.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import Course from "../models/course.js";
import Video from "../models/video.js";
import nodemailer from "nodemailer";
import Exercise from "../models/exercise.js";

export const requestAccess = async (req, res) => {
  try {
    const { courseId, corporateTraineeId } = req.query;
    const castedCourseId = mongoose.Types.ObjectId(courseId);
    const castedCorporateTraineeId =
      mongoose.Types.ObjectId(corporateTraineeId);
    //check if not alraedy requested
    const isRequested = await RequestCourse.findOne({
      course: castedCourseId,
      corporateTrainee: castedCorporateTraineeId,
    });
    if (isRequested) {
      return res.status(409).json({ message: "Already requested" });
    }
    const newRequest = await RequestCourse.create({
      course: courseId,
      corporateTrainee: corporateTraineeId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCorporateTrainees = async (req, res) => {
  try {
    const corporateTrainees = await CorporateTrainee.find();
    res.status(200).json(corporateTrainees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCorporateTrainee = async (req, res) => {
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    res.status(200).json(corporateTrainee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTraineeCorp = async (req, res) => {
  const { id } = req.params;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    res.status(200).json(corporateTrainee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  const id = req.userid;
  console.log("getMyCourses");
  try {
    const corporateTrainee = await CorporateTrainee.findById(id).populate({
      path: "myCourses.courseId",
    });
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });

    const courses = corporateTrainee.myCourses.map((course) => course.courseId);

    if (!courses) return res.status(404).json({ message: "Courses not found" });
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGrade = async (req, res) => {
  const { exerciseId } = req.query;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });

    const solvedArr = corporateTrainee.myCourses.map(
      (course) => course.solvedExercises
    );
    const solved = solvedArr.reduce((acc, val) => acc.concat(val), []);

    const exercise = solved.find(
      (exercise) => exercise.exerciseId == exerciseId
    );
    if (!exercise) return res.status(200).json(null);
    res.status(200).json(exercise.grade);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addExercise = async (req, res) => {
  const { exerciseId, grade } = req.query;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });

    const solvedArr = corporateTrainee.myCourses.map(
      (course) => course.solvedExercises
    );
    const solved = solvedArr.reduce((acc, val) => acc.concat(val), []);

    const exercise = solved.find(
      (exercise) => exercise.exerciseId == exerciseId
    );
    if (exercise)
      return res
        .status(409)
        .json({ message: "Exercise was already solved before" });

    const exerciseToAdd = await Exercise.findById(exerciseId).populate({
      path: "subtitle_id",
    });

    if (!exerciseToAdd)
      return res.status(404).json({ message: "Exercise not found" });

    const course = corporateTrainee.myCourses.find((course) =>
      course.courseId.equals(exerciseToAdd.subtitle_id.course_id)
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    course.solvedExercises.push({ exerciseId, grade });
    await corporateTrainee.save();
    //calculate progress
    const progress = await calculateProgress(course.courseId, id);
    res.status(200).json(progress);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addVideoWatched = async (req, res) => {
  const { videoId } = req.body;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });

    const video = await Video.findById(videoId).populate({
      path: "subtitle_id",
    });
    const courseId = video.subtitle_id.course_id;

    const course = corporateTrainee.myCourses.find((course) =>
      course.courseId.equals(courseId)
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    const videoFound = course.watchedVideos.find((video) => video == videoId);
    if (videoFound)
      return res.status(200).json({ message: "video already watched" });

    course.watchedVideos.push(videoId);
    await corporateTrainee.save();
    const progress = await calculateProgress(courseId, id);
    console.log(progress);
    return res.status(200).json(progress);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProgress = async (req, res) => {
  const { courseId } = req.query;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });
    const Mycourse = corporateTrainee.myCourses.find((course) =>
      course.courseId.equals(courseId)
    );
    if (!Mycourse) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json(Mycourse.courseProgress);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const calculateProgress = async (courseId, userid) => {
  const corporateTrainee = await CorporateTrainee.findById(userid);
  const Mycourse = corporateTrainee.myCourses.find((course) =>
    course.courseId.equals(courseId)
  );
  const course = await Course.findById(courseId).populate({
    path: "subtitles",
  });
  const subtitles = course.subtitles;

  const videos = subtitles.map((subtitle) => subtitle.videos);
  const videosArr = videos.reduce((acc, val) => acc.concat(val), []);
  const videosIds = videosArr.map((video) => video._id);
  const watchedVideos = Mycourse.watchedVideos;

  const exercises = subtitles.map((subtitle) => subtitle.exercises);
  const exercisesArr = exercises.reduce((acc, val) => acc.concat(val), []);
  const exercisesIds = exercisesArr.map((exercise) => exercise._id);

  const solvedExercises = Mycourse.solvedExercises.map(
    (exercise) => exercise.exerciseId
  );

  const progress =
    (watchedVideos.length + solvedExercises.length) /
    (videosIds.length + exercisesIds.length);

  console.log(
    "progress: " + progress,
    "watched videos: " + watchedVideos.length,
    "solved exercises: " + solvedExercises.length,

    "total videos: " + videosIds.length,
    "total exercises: " + exercisesIds.length
  );

  Mycourse.courseProgress = progress;
  if (progress == 1 && !Mycourse.finished) {
    console.log("course completed");
    const certificate = await sendCertificate(courseId, userid);
    console.log(certificate);
    Mycourse.finished = true;
  }
  await corporateTrainee.save();
  return progress;
};

const sendCertificate = async (courseId, userid) => {
  const corporateTrainee = await CorporateTrainee.findById(userid);
  const Mycourse = corporateTrainee.myCourses.find((course) =>
    course.courseId.equals(courseId)
  );

  if (!Mycourse) return { message: "course not found" };

  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "gucaclproject123@outlook.com",
      pass: "@clpr0ject",
    },
  });
  console.log("Current directory: " + process.cwd());

  var mailOptions = {
    from: "gucaclproject123@outlook.com",
    to: corporateTrainee.email,

    subject: "Congratulations! You have completed the course",

    text: "Congratulations! You have completed a course, you can download the certificate from the attachment or the website",

    attachments: [
      {
        filename: "certificate.pdf",
        path: "./assets/certificate.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log("sending mail");
    if (error) {
      console.log(error);

      return { message: error };
    } else {
      console.log("Email sent: " + info.response);
      return { message: info.response };
    }
  });
};

export const pushNotes = async (req, res) => {
  const { notes, videoId } = req.body;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });
    const video = await Video.findById(videoId).populate({
      path: "subtitle_id",
    });

    const courseId = video.subtitle_id.course_id;
    const course = corporateTrainee.myCourses.find((course) =>
      course.courseId.equals(courseId)
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    const index = course.takenNotes.findIndex(
      (note) => note.videoId == videoId
    );

    if (index != -1) {
      // replace notes
      console.log("if");
      course.takenNotes[index].notes = notes;
    } else {
      console.log("else");
      console.log(notes);
      course.takenNotes.push({ videoId: videoId, notes: notes });
    }
    console.log(course.takenNotes);
    await corporateTrainee.save();
    console.log(corporateTrainee);
    return res.status(200).json(corporateTrainee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  const { videoId } = req.query;
  const id = req.userid;
  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });
    const video = await Video.findById(videoId).populate({
      path: "subtitle_id",
    });

    const courseId = video.subtitle_id.course_id;
    const course = corporateTrainee.myCourses.find((course) =>
      course.courseId.equals(courseId)
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    const notes = course.takenNotes.find((note) => note.videoId == videoId);

    if (notes) {
      return res.status(200).json(notes.notes);
    }
    return res.status(200).json([]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRatingCorporateTrainee = async (req, res) => {
  const { review, courseId } = req.body;
  const rating = parseInt(req.body.rating);
  console.log(rating);
  const id = req.userid;

  try {
    const corporateTrainee = await CorporateTrainee.findById(id);
    if (!corporateTrainee)
      return res.status(404).json({ message: "Trainee not found" });

    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const index = course.ratingsAndReviews.findIndex(
      (rating) => rating.corporateTrainee == id
    );
    if (index != -1) {
      // update rating and review
      course.ratingsAndReviews[index].rating = rating;
      course.ratingsAndReviews[index].review = review;
    } else {
      course.ratingsAndReviews.push({
        rating: rating,
        review: review,
        individualTrainee: null,
        corporateTrainee: id,
      });
    }
    // calculate average rating
    let sum = 0;
    course.ratingsAndReviews.forEach((rating) => {
      sum += rating.rating;
    });
    course.rating = sum / course.ratingsAndReviews.length;

    console.log(course);
    await course.save();

    return res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
