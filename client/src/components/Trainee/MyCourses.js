import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Box,
  Rating,
  CircularProgress,
  CardMedia,
  Stack,
} from "@mui/material";
import { getMyCourses as getMyCoursesIndiv } from "../../api/individualTrainee";
import { getMyCourses as getMyCoursesCorporate } from "../../api/corporateTrainee";
import { useHistory } from "react-router-dom";
import { CourseCard } from "../Course/CourseCard.js";
import { TraineeCourseCard } from "./TraineeCourseCard.js";
import { Alert } from "@mui/material";

export const MyCourses = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const fetchCourses = async () => {
    setIsLoading(true);
    let res;

    if (user?.role === "individualTrainee") {
      res = await getMyCoursesIndiv();
    } else {
      res = await getMyCoursesCorporate();
    }

    console.log(res);
    if (res.constructor.name === "AxiosError") {
      setAlert({ severity: "error", message: res.message });
      setIsLoading(false);
      return;
    }
    if (res.data.length === 0) {
      setAlert({
        severity: "info",
        message: "You have not enrolled in any courses yet.",
      });
      setIsLoading(false);
      return;
    }

    console.log(res.data);
    setCourses(res.data);
    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchCourses();
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <Grid
        container
        spacing={2}
        width={700}
        marginLeft={"auto"}
        marginRight={"auto"}
      >
        {courses?.map((course) => (
          <Grid item xs={6}>
            <TraineeCourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
