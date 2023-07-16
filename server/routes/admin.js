import express from "express";
import AuthUser from "../middleware/AuthUser.js";
import {
  acceptRefundRequest,
  createUser,
  definePromotions,
  getRefundRequests,
  getReportedProblems,
  getRequestCourses,
  grantCourseAccess,
  rejectCourseAccess,
  rejectRefundRequest,
  updateProblemStatus,
} from "../controller/admin.js";
const router = express.Router();
router.use(AuthUser);
router.post("/createUser", createUser);
router.get("/getRequestCourses", getRequestCourses);
router.post("/grantCourseAccess", grantCourseAccess);
router.delete("/rejectCourseAccess", rejectCourseAccess);
router.get("/getReportedProblems", getReportedProblems);
router.get("/getRefundRequests", getRefundRequests);
router.patch("/acceptRefundRequest", acceptRefundRequest);
router.delete("/rejectRefundRequest", rejectRefundRequest);
router.patch("/updateProblemStatus", updateProblemStatus);
router.patch("/definePromotions", definePromotions);
export default router;
