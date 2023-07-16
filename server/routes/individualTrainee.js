import express from "express";
import {
  getIndividualTrainees,
  getMyCourses,
  getGrade,
  payForCourse,
  addExercise,
  requestRefund,
  addVideoWatched,
  getProgress,
  pushNotes,
  getNotes,
  getIndividualTrainee,
  addRatingIndividualTrainee,
} from "../controller/individualTrainee.js";
import AuthUser from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/payForCourse", payForCourse);
router.post("/requestRefund", requestRefund);

router.use(AuthUser);
router.get("/", getIndividualTrainees);
router.get("/getMyCourses", getMyCourses);
router.get("/getGrade", getGrade);
router.post("/addExercise", addExercise);
router.get("/getTrainee", getIndividualTrainee);
router.post("/addVideoWatched", addVideoWatched);
router.get("/getProgress", getProgress);
router.post("/pushNotes", pushNotes);
router.get("/getNotes", getNotes);
router.post("/addRatingIndividualTrainee", addRatingIndividualTrainee);
export default router;
