import express from "express";
import {
  addRating,
  createCourse,
  definePromotion,
  getInstructor,
  getInstructorCoursesFiltered,
  getRatingsAndReviews,
  getInstructorNoID,
  editInstructorProfile,
} from "../controller/instructor.js";
import AuthUser from "../middleware/AuthUser.js";
const router = express.Router();
router.get("/getInstructor", getInstructor);

router.use(AuthUser);
router.post("/createCourse", createCourse);
router.patch("/definePromotion", definePromotion);
router.post("/addRating", addRating);
router.get("/getInstructorCoursesFiltered", getInstructorCoursesFiltered);
router.get("/getRatingsAndReviews", getRatingsAndReviews);
router.get("/getInstructorNoID", getInstructorNoID);
router.patch("/editInstructorProfile", editInstructorProfile);
export default router;
