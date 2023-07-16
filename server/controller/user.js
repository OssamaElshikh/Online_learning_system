import mongoose from "mongoose";
import CorporateTrainee from "../models/corporateTrainee.js";
import IndividualTrainee from "../models/individualTrainee.js";
import Instructor from "../models/instructor.js";
import ReportedProblem from "../models/reportedProblem.js";

export const reportProblem = async (req, res) => {
  try {
    const { userId, courseId, problem, problemType } = req.query;
    const castedCourseId = mongoose.Types.ObjectId(courseId);
    const castedUserId = mongoose.Types.ObjectId(userId);
    const individualTrainee = await IndividualTrainee.findOne({
      _id: castedUserId,
    });

    if (!individualTrainee) {
      const corporateTrainee = await CorporateTrainee.findById(castedUserId);
      if (!corporateTrainee) {
        const instructor = await Instructor.findById(castedUserId);
        if (!instructor) {
          res.status(404).json({ message: "User not found" });
        } else {
          const createdProblem = await ReportedProblem.create({
            instructor: castedUserId,
            course: castedCourseId,
            problem: problem,
            problemType: problemType,
          });

          res.status(200).json(createdProblem);
        }
      } else {
        const createdProblem = await ReportedProblem.create({
          corporateTrainee: castedUserId,
          course: castedCourseId,
          problem: problem,
          problemType: problemType,
        });

        res.status(200).json(createdProblem);
      }
    } else {
      const createdProblem = await ReportedProblem.create({
        individualTrainee: castedUserId,
        course: castedCourseId,
        problem: problem,
        problemType: problemType,
      });
      res.status(200).json(createdProblem);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserReportedProblems = async (req, res) => {
  try {
    const { id } = req.query;

    const problems = await ReportedProblem.find()
      .or([
        { individualTrainee: id },
        { corporateTrainee: id },
        { instructor: id },
      ])
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

export const followUp = async (req, res) => {
  try {
    const { id, message } = req.query;

    const problem = await ReportedProblem.findById(id);

    problem.problem = problem.problem + "\n" + message;
    problem.status = "unseen";

    await problem.save();

    return res.status(200).json(problem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResolvedUserProblems = async (req, res) => {
  try {
    const { id } = req.query;

    const problems = await ReportedProblem.find()
      .or([
        { individualTrainee: id },
        { corporateTrainee: id },
        { instructor: id },
      ])
      .where("status")
      .equals("resolved")
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
