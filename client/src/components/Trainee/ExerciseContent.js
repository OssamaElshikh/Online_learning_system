import React from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  List,
  Stack,
  Button,
} from "@mui/material";

import { TakeTest } from "./TakeTest";
import { ViewSolution } from "./ViewSolution";
import { getGrade as getGradeIndiv } from "../../api/individualTrainee";
import { getGrade as getGradeCorporate } from "../../api/corporateTrainee";
import { useEffect } from "react";
import background from "../../assets/test.jpeg";
export const ExerciseContent = ({ exercise, key, setProgress }) => {
  const [testOpen, setTestOpen] = React.useState(false);
  const [solutionOpen, setSolutionOpen] = React.useState(false);
  const [grade, setGrade] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  const fetchGrade = async () => {
    setIsLoading(true);
    let res;
    if (user?.role === "individualTrainee") {
      res = await getGradeIndiv(exercise._id);
    } else {
      res = await getGradeCorporate(exercise._id);
    }

    setIsLoading(false);
    if (res.constructor.name !== "AxiosError") {
      setGrade(res.data);
    } else {
      console.log(res.response.data.message);
      setAlert({ severity: "error", message: res.response.data.message });
    }
  };

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "40vh",
    width: "100%",
  };

  useEffect(() => {
    console.log("hi");
    fetchGrade();
  }, []);
  return (
    <Box>
      {!isLoading && (
        <>
          <TakeTest
            exercise={exercise}
            open={testOpen}
            setOpen={setTestOpen}
            setGrade={setGrade}
            setProgress={setProgress}
          />
          <ViewSolution
            exercise={exercise}
            open={solutionOpen}
            setOpen={setSolutionOpen}
          />
          <Box style={styles}></Box>
          <Paper
            sx={{
              maxWidth: "550px",
              margin: "auto",
              marginTop: "-200px",
              height: "500px",
              width: "100%",
              // backgroundColor: "rgb(208 196 196 / 87%)",
              backgroundColor: "rgb(255 255 255 / 87%)",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }}>
              {exercise.title}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* <ReactPlayer url={video.url} width="50%" controls /> */}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: "40%",
                  height: 100,
                  border: 1,
                  borderRadius: "4px",
                }}
              >
                {grade !== null && !isLoading ? (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: 2 }}
                  >
                    Test result:{" "}
                    <mark style={{ color: "green", background: "none" }}>
                      {grade.toFixed(2) * 100}%
                    </mark>
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", padding: 2 }}
                  >
                    Test result: Not taken
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 2,
                alignItems: "flex-end",
                height: "50%",

                width: "100%",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  width="fit-content"
                  height="fit-content"
                  variant="contained"
                  disabled={grade !== null && !isLoading}
                  onClick={() => setTestOpen(true)}
                >
                  Take test
                </Button>
                <Button
                  variant="contained"
                  width="fit-content"
                  height="fit-content"
                  onClick={() => setSolutionOpen(true)}
                  disabled={grade === null}
                >
                  view solution
                </Button>
              </Stack>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};
