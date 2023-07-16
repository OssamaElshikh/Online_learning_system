import express from "express";
import {
  login,
  signUp,
  resetPasswordMail,
  changePassword,
} from "../controller/auth.js";
import {
  followUp,
  getResolvedUserProblems,
  getUserReportedProblems,
  reportProblem,
} from "../controller/user.js";

const router = express.Router();

router.get("/report", getUserReportedProblems);
router.get("/resolved", getResolvedUserProblems);
router.patch("/followUp", followUp);
router.post("/signin", login);
router.post("/signup", signUp);
router.post("/reportProblem", reportProblem);
router.post("/resetPasswordMail", resetPasswordMail);
router.patch("/changePassword", changePassword);

export default router;
