import IndividualTrainee from "../models/individualTrainee.js";
import Admin from "../models/admin.js";
import CorporateTrainee from "../models/corporateTrainee.js";
import Instructor from "../models/instructor.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (!individualTrainee) {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        const corporateTrainee = await CorporateTrainee.findOne({ email });
        if (!corporateTrainee) {
          const instructor = await Instructor.findOne({ email });
          if (!instructor) {
            return res.status(400).json({ message: "User doesn't exist" });
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            instructor.password
          );
          if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
          const token = instructor.generateAuthToken();
          return res
            .status(200)
            .json({ result: instructor, role: "instructor", token: token });
        }
        const isPasswordCorrect = await bcrypt.compare(
          password,
          corporateTrainee.password
        );
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = corporateTrainee.generateAuthToken();
        return res.status(200).json({
          result: corporateTrainee,
          role: "corporateTrainee",
          token: token,
        });
      }
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = admin.generateAuthToken();
      return res
        .status(200)
        .json({ result: admin, role: "admin", token: token });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      individualTrainee.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = individualTrainee.generateAuthToken();
    return res.status(200).json({
      result: individualTrainee,
      role: "individualTrainee",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, gender } =
    req.body;
  try {
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (individualTrainee) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await IndividualTrainee.create({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
    });
    const token = result.generateAuthToken();
    return res
      .status(200)
      .json({ result: result, role: "individualTrainee", token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPasswordMail = async (req, res) => {
  const { email } = req.query;
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "gucaclproject123@outlook.com",
      pass: "@clpr0ject",
    },
  });
  let userId = "";
  try {
    const individualTrainee = await IndividualTrainee.findOne({ email });
    if (!individualTrainee) {
      const corporateTrainee = await CorporateTrainee.findOne({ email });
      if (!corporateTrainee) {
        const instructor = await Instructor.findOne({ email });
        if (!instructor) {
          return res.status(400).json({ message: "User doesn't exist" });
        } else {
          userId = instructor._id.toString();
        }
      } else {
        userId = corporateTrainee._id.toString();
      }
    } else {
      userId = individualTrainee._id.toString();
    }
    let html = `<div>
    <h1>Reset Password</h1>
    <p>Click on the link below to reset your password</p>
    <a href="http://localhost:3000/resetPassword/${userId}">Reset Password</a>
    </div>`;
    var mailOptions = {
      from: "gucaclproject123@outlook.com",
      to: email,

      subject: "Reset Password",

      text: "Hello User!",
      html: html,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      console.log("sending mail");
      if (error) {
        return { message: error };
      } else {
        return { message: info.response };
      }
    });
    return res.status(200).json({ message: "Mail sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, confirmPassword, userId } = req.query;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const individualTrainee = await IndividualTrainee.findById(userId);
    if (!individualTrainee) {
      const corporateTrainee = await CorporateTrainee.findById(userId);
      if (!corporateTrainee) {
        const instructor = await Instructor.findById(userId);
        if (!instructor) {
          return res.status(400).json({ message: "User doesn't exist" });
        } else {
          instructor.password = hashedPassword;
          await instructor.save();
        }
      } else {
        corporateTrainee.password = hashedPassword;
        await corporateTrainee.save();
      }
    } else {
      individualTrainee.password = hashedPassword;
      await individualTrainee.save();
    }

    return res.status(200).json({ message: "Password changed" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
