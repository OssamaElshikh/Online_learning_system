import express from "express";
import {
  requestAccess,
  getCorporateTrainee,
  getMyCourses,
  getGrade,
  addExercise,
  addVideoWatched,
  getProgress,
  pushNotes,
  getNotes,
  addRatingCorporateTrainee,
} from "../controller/corporateTrainee.js";
import AuthUser from "../middleware/AuthUser.js";

const router = express.Router();

router.use(AuthUser);
router.post("/requestAccess", requestAccess);
router.get("/getCorporateTrainee", getCorporateTrainee);
router.get("/getMyCourses", getMyCourses);
router.get("/getGrade", getGrade);
router.post("/addExercise", addExercise);
router.post("/addVideoWatched", addVideoWatched);
router.get("/getProgress", getProgress);
router.post("/pushNotes", pushNotes);
router.get("/getNotes", getNotes);
router.post("/addRatingCorporateTrainee", addRatingCorporateTrainee);

export default router;
