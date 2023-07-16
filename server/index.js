import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import individualTraineeRoutes from "./routes/individualTrainee.js";
import instructorRoutes from "./routes/instructor.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import corporateTraineeRoutes from "./routes/corporateTrainee.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/individualTrainee", individualTraineeRoutes);
app.use("/instructor", instructorRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/course", courseRoutes);
app.use("/corporateTrainee", corporateTraineeRoutes);

const port = process.env.PORT || "8000";
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
