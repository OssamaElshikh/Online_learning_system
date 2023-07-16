import React, { useEffect } from "react";
import ReactPlayer from "react-player";
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

import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Alert from "@mui/material";
import { NotesPDF } from "./NotesPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { addVideoWatched as addVideoWatchedCorporate } from "../../api/corporateTrainee";
import { addVideoWatched as addVideoWatchedIndividual } from "../../api/individualTrainee";
import { pushNotes as pushNotesCorporate } from "../../api/corporateTrainee";
import { pushNotes as pushNotesIndividual } from "../../api/individualTrainee";
import { getNotes as getNotesCorporate } from "../../api/corporateTrainee";
import { getNotes as getNotesIndividual } from "../../api/individualTrainee";

export const VideoContent = ({ video, setProgress }) => {
  const [alert, setAlert] = useState(null);
  const [userCurrTime, setUserCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isWatched, setIsWatched] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleAddNote = () => {
    setNotes([...notes, note]);
    handlePushNotes([...notes, note]);
    setNote("");
  };

  const handlePushNotes = async (notess) => {
    let res;
    if (user?.role === "individualTrainee") {
      res = await pushNotesIndividual(video._id, notess);
    } else {
      res = await pushNotesCorporate(video._id, notess);
    }

    console.log(res);
    if (res.constructor.name !== "AxiosError") {
      setAlert({
        severity: "success",
        message: "Notes added successfully",
      });
    } else {
      setAlert({
        severity: "error",
        message: res.response.data.message,
      });
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    let res;
    if (user?.role === "individualTrainee") {
      res = await getNotesIndividual(video._id);
    } else {
      res = await getNotesCorporate(video._id);
    }
    console.log(res);
    if (res.constructor.name !== "AxiosError") {
      setNotes(res.data);
    } else {
      setAlert({
        severity: "error",

        message: res.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const pushVideo = async () => {
    let res;
    if (user?.role === "individualTrainee") {
      res = await addVideoWatchedIndividual(video._id);
    } else {
      res = await addVideoWatchedCorporate(video._id);
    }
    console.log("add");
    console.log(res);
    if (res.constructor.name !== "AxiosError") {
      const { message } = res.data;
      if (message != "video already watched") {
        setAlert({
          severity: "success",
          message: "Video added to watched list",
        });
        setProgress(res.data);
      }
    } else {
      setAlert({
        severity: "error",
        message: res.response.data.message,
      });
    }
  };
  useEffect(() => {
    if ((userCurrTime / duration) * 100 > 90 && isWatched !== video._id) {
      console.log("we are here");
      setIsWatched(video._id);
      handleWatched();
    }
  }, [userCurrTime]);
  const handleWatched = () => {
    pushVideo();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {!isLoading && (
        <>
          <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }}>
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ReactPlayer
              url={video.url}
              width="50%"
              controls
              onProgress={(progress) => {
                setUserCurrTime((progress.playedSeconds / 60).toFixed(2));
              }}
              onDuration={(duration) => {
                setDuration((duration / 60).toFixed(2));
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              sx={{ width: "50%", marginTop: "1rem" }}
              id="outlined-multiline-static"
              label="Write your notes here"
              multiline
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <TextField
          sx={{ width: "50%", marginTop: "1rem" }}
          id="outlined-multiline-static"
          label="your notes"
          focused={true}
          value="hello"
          InputProps={{ readOnly: true, disableUnderline: true }}
          multiline
          rows={4}
        /> */}

            <Box
              sx={{
                width: "50%",
                marginTop: "1rem",
              }}
            >
              <Typography variant="h6">Your notes</Typography>

              <ul>
                {notes.map((note) => (
                  <li>
                    <Typography variant="h8">{note}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleAddNote}>
                Save note
              </Button>
              <PDFDownloadLink
                document={<NotesPDF title={video.title} notes={notes} />}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" startIcon={<DownloadIcon />}>
                  Download
                </Button>
              </PDFDownloadLink>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VideoContent;
