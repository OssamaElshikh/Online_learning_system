import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  userName: { type: String, unique: true },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      role: "admin",
    },
    process.env.TOKEN_KEY,
    { expiresIn: "4h" }
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
