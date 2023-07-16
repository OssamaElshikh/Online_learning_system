import express from "express";
import {
  getCourses,
  getCourse,
  getInstructorCourses,
  getPopularCourses,
  enrollTrainee,
  refundCourse,
  getCoursesFiltered,
  getRatingsAndReviews,
} from "../controller/course.js";
import AuthUser from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/", getCourses);
router.get("/filter", getCoursesFiltered);
router.get("/course", getCourse);
router.get("/popularCourses", getPopularCourses);

router.use(AuthUser);
router.get("/instructor", getInstructorCourses);
router.get("/enroll", enrollTrainee);
router.get("/refund", refundCourse);
router.get("/ratingsAndReviews", getRatingsAndReviews);
export default router;
