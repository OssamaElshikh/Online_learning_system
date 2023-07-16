import mongoose from "mongoose";
import Admin from "../models/admin.js";
import Instructor from "../models/instructor.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import IndividualTrainee from "../models/individualTrainee.js";
import Course from "../models/course.js";
import RequestCourse from "../models/requestCourse.js";
import ReportedProblem from "../models/reportedProblem.js";
import RefundRequest from "../models/refundRequest.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const id = req.userid;
    const isAdmin = await Admin.findById(id);
    if (!isAdmin) {
      res
        .status(401)
        .json({ message: "You are not authorized to create a user" });
    }

    const { firstName, lastName, userName, email, gender } = req.body;
    const password = await bcrypt.hash(req.body.password, 12);

    const { role } = req.body;

    switch (role) {
      case "Admin":
        const newAdmin = await Admin.create({
          firstName,
          lastName,
          userName,
          email,
          password,
        });
        if (newAdmin) {
          res.status(200).json(newAdmin);
        } else {
          res.status(400).json({ message: "Invalid admin data" });
        }
        break;
      case "Instructor":
        const newInstructor = await Instructor.create({
          firstName,
          lastName,
          email,
          password,
        });
        if (newInstructor) {
          res.status(200).json(newInstructor);
        } else {
          res.status(400).json({ message: "Invalid instructor data" });
        }
        break;
      case "Corporate trainee":
        const newCorporateTrainee = await CorporateTrainee.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender,
        });
        if (newCorporateTrainee) {
          res.status(200).json(newCorporateTrainee);
        } else {
          res.status(400).json({ message: "Invalid corporate trainee data" });
        }
        break;
      default:
        res.status(400).json({ message: "Invalid user type" });
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRequestCourses = async (req, res) => {
  try {
    const requestCourses = await RequestCourse.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "corporateTrainee" });

    res.status(200).json(requestCourses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const grantCourseAccess = async (req, res) => {
  try {
    const { courseId, corporateTraineeId, requestCourseId } = req.query;
    console.log("courseId", courseId);
    console.log("corporateTraineeId", corporateTraineeId);
    console.log("requestCourseId", requestCourseId);
    const corporateTrainee = await CorporateTrainee.findById(
      corporateTraineeId
    );
    const course = await Course.findById(courseId);
    if (!corporateTrainee || !course) {
      return res.status(404).json({ message: "Invalid data" });
    }
    course.n_enrolled++;
    await course.save();
    corporateTrainee.myCourses.push({ courseId: courseId });
    await corporateTrainee.save();
    await RequestCourse.findByIdAndDelete(requestCourseId);
    const requests = await RequestCourse.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "corporateTrainee" });

    res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const rejectCourseAccess = async (req, res) => {
  try {
    const { requestCourseId } = req.query;
    await RequestCourse.findByIdAndDelete(requestCourseId);
    const requests = await RequestCourse.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "corporateTrainee" });
    res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReportedProblems = async (req, res) => {
  try {
    const problems = await ReportedProblem.find()
      .where("status")
      .ne("resolved")
      .populate({
        path: "course",
        select: "title",
      })
      .populate({ path: "individualTrainee" })
      .populate({ path: "corporateTrainee" })
      .populate({ path: "instructor" });

    return res.status(200).json(problems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProblemStatus = async (req, res) => {
  try {
    const { problemId, status } = req.query;
    await ReportedProblem.findByIdAndUpdate(problemId, { status: status });
    const updatedProblems = await ReportedProblem.find()
      .where("status")
      .ne("resolved")
      .populate({
        path: "course",
        select: "title",
      })
      .populate({ path: "individualTrainee" })
      .populate({ path: "corporateTrainee" })
      .populate({ path: "instructor" });
    return res.status(200).json(updatedProblems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRefundRequests = async (req, res) => {
  try {
    const refundRequests = await RefundRequest.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "individualTrainee" })
      .populate({ path: "instructor" });
    return res.status(200).json(refundRequests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const acceptRefundRequest = async (req, res) => {
  try {
    const { refundId, courseId, individualTraineeId, instructorId } = req.query;
    const individualTrainee = await IndividualTrainee.findById(
      individualTraineeId
    );
    //find the course in individualTrainee.myCourses and remove it from myCourses array
    const course = individualTrainee.myCourses.find(
      (course) => course.courseId == courseId
    );
    if (!course) {
      await RefundRequest.findByIdAndDelete(refundId);
      const updatedRequests = await RefundRequest.find()
        .populate({ path: "course", select: "title" })
        .populate({ path: "individualTrainee" })
        .populate({ path: "instructor" });
      return res.status(200).json(updatedRequests);
    }

    const refundedPrice = course.coursePrice;
    individualTrainee.myCourses = individualTrainee.myCourses.filter(
      (course) => course.courseId != courseId
    );
    individualTrainee.wallet += refundedPrice;
    await individualTrainee.save();

    const instructor = await Instructor.findById(instructorId);
    instructor.wallet -= refundedPrice * 0.86;
    await instructor.save();

    await RefundRequest.findByIdAndDelete(refundId);
    const updatedRequests = await RefundRequest.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "individualTrainee" })
      .populate({ path: "instructor" });
    return res.status(200).json(updatedRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectRefundRequest = async (req, res) => {
  try {
    const { refundId } = req.query;
    await RefundRequest.findByIdAndDelete(refundId);
    const updatedRequests = await RefundRequest.find()
      .populate({ path: "course", select: "title" })
      .populate({ path: "individualTrainee" })
      .populate({ path: "instructor" });
    return res.status(200).json(updatedRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const definePromotions = async (req, res) => {
  try {
    const { courses, discount, startDate, endDate } = req.query;
    console.log(courses);

    const start = new Date(startDate);
    const end = new Date(endDate);

    //courses contains a list of ids i want to set promotion to all of them
    console.log("Just before");
    await Course.findByIdAndUpdate(courses, {
      discount: {
        value: discount / 100,
        startDate: start,
        endDate: end,
      },
    });
    console.log("Just after");
    const updatedCourses = await Course.find();
    res.status(200).json(updatedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
