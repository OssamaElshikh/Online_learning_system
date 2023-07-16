import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { enrollTrainee } from "../../api/course";
import { payForCourse } from "../../api/individualTrainee";
import { requestAccess } from "../../api/corporateTrainee";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";

export const CoursePreview = ({ course }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userObject, setUserObject] = useState(user?.result);

  const country = useSelector((state) => state.country.value);

  const [buyNow, setBuyNow] = useState(false);

  const [requestCourse, setRequestCourse] = useState(false);

  const [enrollLoading, setEnrollLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [error, setError] = useState(false);

  let price = course?.price;
  let newPrice = null;
  let validUntil = null;
  if (course?.discount) {
    const today = new Date();
    const startDate = new Date(course.discount.startDate);
    const endDate = new Date(course.discount.endDate);

    if (startDate < today && endDate > today) {
      newPrice = course.price * (1 - course.discount.value);
      newPrice = Math.round(newPrice * country.rate * 100) / 100;
      validUntil = endDate;
    }
  }
  price = Math.round(price * country.rate * 100) / 100;

  const handleBuyNow = async () => {
    if (user?.role === "individualTrainee") {
      try {
        if (enrollLoading) return;
        setEnrollLoading(true);
        const { data } = await payForCourse(
          course?._id,
          userObject?._id,
          course?.instructor?.id
        );
        window.location = data.url;
        setEnrollLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    if (user?.token) {
      if (user?.role === "individualTrainee") {
        setBuyNow(true);
      } else {
        setBuyNow(false);
      }
      if (user?.role === "corporateTrainee") {
        setRequestCourse(true);
      } else {
        setRequestCourse(false);
      }
    } else {
      setBuyNow(false);
      setRequestCourse(false);
    }
  }, [user]);

  const handleRequestCourse = async () => {
    if (user?.role === "corporateTrainee") {
      try {
        if (accessLoading) return;
        setAccessLoading(true);
        const res = await requestAccess(course?._id, userObject?._id);
        setAccessLoading(false);
        if (res.constructor.name !== "AxiosError") {
          setDone(true);
        }
        setTimeout(() => {
          setDone(false);
        }, 3000);
      } catch (err) {
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
          setAccessLoading(false);
        }, 3000);
      }
    }
  };

  return (
    <div>
      <Paper
        elevation={12}
        sx={{ height: 300, backgroundColor: "primary.main" }}
      >
        <ReactPlayer
          url={course?.previewVideo}
          controls={true}
          width="100%"
          height="75%"
        />
        <Stack direction="column" style={{ height: "25%" }}>
          {newPrice ? (
            <>
              <Stack direction="row" spacing={1}>
                <Typography
                  color={"whitesmoke"}
                  variant="h6"
                  textAlign={"left"}
                  paddingTop={0.2}
                  paddingLeft={0.5}
                >
                  {course ? newPrice + " " + country.currency : ""}
                </Typography>

                <Typography
                  color={"whitesmoke"}
                  variant="body2"
                  textAlign={"left"}
                  paddingTop={0.2}
                  paddingLeft={0.5}
                  display="inline"
                >
                  <s>
                    {course
                      ? Math.round(course.price * country.rate * 100) / 100 +
                        " " +
                        country.currency
                      : ""}
                  </s>
                </Typography>
                <Typography
                  color={"whitesmoke"}
                  variant="body2"
                  textAlign={"left"}
                  paddingTop={0.2}
                  paddingLeft={0.5}
                  display="inline"
                >{`Valid Until: ${validUntil.toLocaleDateString()}`}</Typography>
              </Stack>
            </>
          ) : (
            <Typography
              color={"whitesmoke"}
              variant="h5"
              textAlign={"left"}
              paddingTop={0.2}
              paddingLeft={0.5}
              display="inline"
            >
              {course
                ? Math.round(course?.price * country?.rate * 100) / 100 +
                  " " +
                  country?.currency
                : ""}
            </Typography>
          )}

          {userObject?.myCourses?.find((c) => c.courseId === course?._id) && (
            <Button
              color="button"
              variant="contained"
              href={"/trainee/course/" + course._id}
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Go to Course
            </Button>
          )}
          {buyNow &&
            !userObject?.myCourses?.find((c) => c.courseId === course?._id) && (
              <Button
                color="button"
                variant="contained"
                style={{
                  alignSelf: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            )}
          {requestCourse &&
            !userObject?.myCourses?.find((c) => c.courseId === course?._id) && (
              <Stack direction={"row"} spacing={2}>
                <Button
                  color="button"
                  variant="contained"
                  style={{
                    alignSelf: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={handleRequestCourse}
                >
                  Request Access
                </Button>
                {accessLoading && <CircularProgress color="button" />}
                {done && <DoneIcon color="button" />}
                {error && <DangerousIcon sx={{ color: "red" }} />}
              </Stack>
            )}
        </Stack>
      </Paper>
    </div>
  );
};
