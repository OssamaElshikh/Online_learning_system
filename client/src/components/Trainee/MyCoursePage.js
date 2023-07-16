import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import { Grid } from "@mui/material";

import { useHistory } from "react-router-dom";
import { getCourse } from "../../api/course";
import { Alert, Box, Divider } from "@mui/material";
import { CourseContent } from "./CourseContent";
import { VideoContent } from "./VideoContent";
import { ExerciseContent } from "./ExerciseContent";
import { getProgress as getProgressIndiv } from "../../api/individualTrainee";
import { getProgress as getProgressCorporate } from "../../api/corporateTrainee";
import { DefaultDetails } from "./DefaultDetails";

export const MyCoursePage = () => {
  const [alert, setAlert] = useState(null);
  const [course, setCourse] = useState(null);
  const [choosenContent, setChoosenContent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const courseId = history.location.pathname.split("/")[3];
  console.log(courseId);
  const user = JSON.parse(localStorage.getItem("profile"));
  const fetchCourse = async () => {
    setIsLoading(true);
    const res = await getCourse(courseId);
    if (res.status === 200) {
      const course = res.data;
      setCourse(course);
      setIsLoading(false);
    } else {
      setAlert({ severity: "error", message: res.data.message });
    }
  };
  const fetchProgress = async () => {
    setIsLoading(true);
    let res;
    if (user?.role === "individualTrainee") {
      res = await getProgressIndiv(courseId);
    } else {
      res = await getProgressCorporate(courseId);
    }

    console.log(res);
    if (res.constructor.name !== "AxiosError") {
      setProgress(res.data);
      setIsLoading(false);
    } else {
      setAlert({ severity: "error", message: res.data.message });
    }
  };
  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, []);

  useEffect(() => {}, [choosenContent]);
  return (
    <div>
      {!isLoading && (
        <Grid container>
          <Grid item xs={3}>
            <CourseContent
              course={course}
              setChoosenContent={setChoosenContent}
              progress={progress}
            />
          </Grid>
          <Grid item xs={9} sx={{ minHeight: "590px" }}>
            {choosenContent?.type === "video" && (
              <VideoContent
                video={choosenContent.content}
                key={choosenContent.content._id}
                setProgress={setProgress}
              />
            )}
            {choosenContent?.type === "exercise" && (
              <ExerciseContent
                exercise={choosenContent.content}
                key={choosenContent.content._id}
                setProgress={setProgress}
              />
            )}
            {!choosenContent && <DefaultDetails course={course} />}
          </Grid>
        </Grid>
      )}
    </div>
  );
};
