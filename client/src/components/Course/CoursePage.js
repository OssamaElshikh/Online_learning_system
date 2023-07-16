import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { CoursePreview } from "./CoursePreview";
import { PreviewAccordion } from "./PreviewAccordion";
import { useParams } from "react-router-dom";
import { getCourse } from "../../api/course";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { requestRefund } from "../../api/individualTrainee";
import { getProgress as getProgressIndiv } from "../../api/individualTrainee";
import { getProgress as getProgressCorporate } from "../../api/corporateTrainee";
import { ProblemPopUp } from "./ProblemPopUp";
import { useHistory } from "react-router-dom";

export const CoursePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [alert, setAlert] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userObject, setUserObject] = React.useState(user?.result);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setIsLoading(true);
    fetchCourse();
    calculateProgress();
    setIsLoading(false);
  }, []);
  const fetchCourse = async () => {
    const { data } = await getCourse(id);
    setCourse(data);
  };
  const calculateProgress = async () => {
    try {
      let res;
      if (user?.role === "individualTrainee") {
        console.log("individual calculate progress");
        res = await getProgressIndiv(id);
      } else {
        console.log("corporate calculate progress");
        res = await getProgressCorporate(id);
      }
      const { data } = res;
      setProgress(data);
    } catch (err) {}
  };

  React.useEffect(() => {
    setValue(course?.rating);
  }, [course]);

  const refundCourse = async () => {
    try {
      setAlert(null);
      const res = await requestRefund(
        course?._id,
        user?.result?._id,
        course?.instructor.id
      );

      if (res.constructor.name !== "AxiosError") {
        setAlert({
          severity: "success",
          message: "Refund requested successfully",
        });
      }
    } catch (err) {
      setAlert({ severity: "error", message: err.message });
    }
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  if (isLoading) {
    return <CircularProgress />;
  } else
    return (
      <div>
        <Grid
          container
          spacing={2}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={0.5}
          backgroundColor="secondary.main"
          position={"relative"}
          style={{
            width: "100vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={8} textAlign={"center"}>
            <Container sx={{ textAlign: "left" }}>
              <Typography variant="h4">{course?.title}</Typography>

              <Stack direction={"row"} spacing={2}>
                <Stack item xs={4} textAlign={"center"}>
                  {" "}
                  <Link
                    color="button.main"
                    onClick={() =>
                      history.push(`instructorPage/${course?.instructor?.id}`)
                    }
                  >
                    {" "}
                    {course?.instructor.name}
                  </Link>
                </Stack>
                <Stack item xs={4} textAlign={"center"}>
                  <Rating
                    precision={0.5}
                    name="Course Rating"
                    value={value}
                    readOnly
                    style={{ color: "black" }}
                  />
                </Stack>
                <Stack item xs={4} textAlign={"center"} direction="row">
                  <AccessTimeIcon />
                  <Typography variant="body2">
                    {course?.hours?.toFixed(2)}hr
                  </Typography>
                </Stack>
              </Stack>

              <Divider />
              <Typography fontSize={12}>
                {course?.summary}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                condimentum, nisl eget ultricies tincidunt, nunc nisl aliquam
                nisl, eu aliquam nunc nisl eget nunc. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  position: "absolute",
                  top: 250,
                  paddingTop: 2,
                }}
                spacing={2}
              >
                <Button
                  color="button"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Report a Problem
                </Button>
                {user?.role === "individualTrainee" &&
                  userObject?.myCourses?.find(
                    (course) => course.courseId === id
                  ) &&
                  (progress < 0.5 || !progress) && (
                    <Button
                      color="button"
                      variant="contained"
                      onClick={refundCourse}
                    >
                      Refund Course
                    </Button>
                  )}

                {alert && (
                  <Grid item xs={12}>
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                  </Grid>
                )}
              </Stack>
            </Container>
          </Grid>

          <Grid item xs={4} textAlign={"center"} paddingRight={2}>
            <CoursePreview course={course} />
          </Grid>
        </Grid>
        <Container style={{ paddingTop: 30 }}>
          <PreviewAccordion subtitles={course?.subtitles} />
        </Container>
        <ProblemPopUp open={open} setOpen={setOpen} courseId={course?._id} />
      </div>
    );
};
