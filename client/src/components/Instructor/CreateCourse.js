import React, { useEffect } from "react";
import {
  TextField,
  Stack,
  Box,
  Button,
  Typography,
  Autocomplete,
  Alert,
} from "@mui/material";
import { AddVideoDialog } from "./AddVideoDialog";
import { AddExerciseDialog } from "./AddExerciseDialog";
import { useState } from "react";
import { createCourse } from "../../api/instructor";
import { Contract } from "./Contract";

const subjects = [
  "programming languages",
  "mathematics",
  "physics",
  "business",
  "chemistry",
  "biology",
  "computer science",
  "economics",
  "finance",
  "history",
  "law",
  "literature",
  "medicine",
  "philosophy",
  "political science",
  "psychology",
  "sociology",
  "statistics",
  "other",
];
export const CreateCourse = () => {
  const [videoArr, setVideoArr] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([]);
  const [subtitleArr, setSubtitleArr] = useState([]);
  const [alert, setAlert] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [subtitleTitle, setSubtitleTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  const handleAddVideo = (formData) => {
    setVideoArr([...videoArr, formData]);
  };

  const handleAddExercise = (formData) => {
    console.log(exerciseArr);
    setExerciseArr([...exerciseArr, formData]);
  };
  const handleSubmit = async () => {
    console.log(title, subject, price, summary, previewVideo, subtitleTitle);
    console.log(subtitleArr);
    console.log(exerciseArr);
    if (
      title.trim() &&
      subject.trim() &&
      price.trim() &&
      summary.trim() &&
      previewVideo.trim()
    ) {
      if (subtitleArr.length === 0) {
        setAlert("Please add atleast one subtitle");
        return;
      }
      if (!accepted) setOpen(true);
      if (accepted) {
        setAlert(null);
        const course = {
          title,
          subject,
          price,
          summary,
          previewVideo,
          subtitles: subtitleArr,
        };
        setAlert(null);
        setIsLoading(true);

        const x = await createCourse(course);

        if (x.constructor.name !== "AxiosError") {
          setResult({
            severity: "success",
            msg: "Course created successfully",
          });
        } else setResult({ severity: "error", msg: x.message });

        setIsLoading(false);
        console.log(course);
      }
    } else {
      setAlert("Please fill all the fields");
    }
  };
  const handleAddSubtitle = () => {
    if (subtitleTitle.trim()) {
      if (videoArr.length === 0 && exerciseArr.length === 0) {
        setAlert("Please add atleast one video or exercise");
        return;
      }
      setSubtitleArr([
        ...subtitleArr,
        { title: subtitleTitle, videos: videoArr, exercises: exerciseArr },
      ]);
      setSubtitleTitle("");
      setVideoArr([]);
      setExerciseArr([]);
      setAlert(null);
    } else {
      setAlert("Please add subtitle title");
    }
  };

  useEffect(() => {}, [
    subtitleArr,
    alert,
    title,
    subject,
    price,
    summary,
    previewVideo,
    subtitleTitle,
    videoArr,
    exerciseArr,
  ]);
  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <div style={{ width: "75%", margin: "auto" }}>
        <Stack spacing={2} direction="column" justifyContent="center">
          <Typography variant="h4"> Course</Typography>
          <TextField
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subjects}
            //    sx={{ wid }}
            onChange={(e, x) => setSubject(x)}
            renderInput={(params) => <TextField {...params} label="Subjects" />}
          />
          <TextField
            type={"number"}
            label="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            label="summary"
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
          <TextField
            label="preview video"
            onChange={(e) => {
              setPreviewVideo(e.target.value);
            }}
          />
          <Typography
            variant="h4"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            Subtitle
          </Typography>
          <TextField
            label="Title"
            onChange={(e) => {
              setSubtitleTitle(e.target.value);
            }}
          />
          <Box>
            <Typography variant="h6"> Videos</Typography>
            <ul>
              {videoArr && videoArr.map((video) => <li> {video.title} </li>)}
            </ul>

            <AddVideoDialog handleAddVideo={handleAddVideo} />

            <Typography variant="h6"> Exercises</Typography>

            <ul>
              {exerciseArr && exerciseArr.map((ex) => <li> {ex.title} </li>)}
            </ul>

            <AddExerciseDialog handleAddExercise={handleAddExercise} />
          </Box>
          {alert && <Alert severity="error">{alert}</Alert>}
          {!isLoading && result && (
            <Alert severity={result.severity}>{result.msg}</Alert>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleAddSubtitle}
              style={{ width: "fit-content" }}
              variant="outlined"
            >
              Confirm subtitle
            </Button>
            <Contract
              setOpen={setOpen}
              open={open}
              accepted={accepted}
              setAccepted={setAccepted}
              setAlert={setAlert}
              handleSubmit={handleSubmit}
            />
            <Button
              onClick={handleSubmit}
              style={{ width: "fit-content" }}
              variant="outlined"
            >
              Create course
            </Button>
          </Box>
        </Stack>
      </div>
    </div>
  );
};
