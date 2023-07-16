import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import { Alert, Button, ListItemIcon, Paper } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import QuizIcon from "@mui/icons-material/Quiz";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { Cert } from "./Cert";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LinearWithValueLabel from "../LinearProgressWithLabel";
import { getProgress } from "../../api/individualTrainee";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, margin } from "@mui/system";
import { useHistory } from "react-router-dom";
import { TraineeRatingPop } from "./TraineeRatingPopUp";
import { addRatingIndividualTrainee } from "../../api/individualTrainee";
import { addRatingCorporateTrainee } from "../../api/corporateTrainee";
export const CourseContent = ({ course, setChoosenContent, progress }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (rating, review) => {
    console.log(course);
    const rateCourse = async () => {
      try {
        let res;
        setAlert(null);
        switch (user?.role) {
          case "individualTrainee":
            res = addRatingIndividualTrainee({
              rating,
              review,
              courseId: course._id,
            });
            break;
          case "corporateTrainee":
            res = addRatingCorporateTrainee({
              rating,
              review,
              courseId: course._id,
            });
            break;
          default:
        }
        await res;

        setAlert({
          severity: "success",
          message: "Thank you for your feedback!",
        });
      } catch (err) {
        setAlert({ severity: "error", message: err.message });
      }
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    };
    rateCourse();
  };
  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        bgcolor: "white",
      }}
    >
      <List>
        <ListItem>
          <Typography variant="h5" sx={{ margin: "auto" }}>
            {course?.title}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              history.push(`/coursePage/${course._id}`);
              // setChoosenContent(null);
            }}
          >
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <LinearWithValueLabel val={progress * 100} />
        {alert && (
          <Alert
            sx={{ margin: "auto", width: "71%" }}
            severity={alert?.severity}
            onClose={() => setAlert(null)}
          >
            {alert?.message}
          </Alert>
        )}

        <Button
          variant="text"
          sx={{ ml: "26px", color: "button.main", width: "fit-content" }}
          onClick={() => setOpen(true)}
        >
          Rate this course
        </Button>

        <TraineeRatingPop
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        />
        {progress == 1 && (
          <Box
            sx={{
              width: "100%",
              margin: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <PDFDownloadLink
              document={<Cert />}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{ width: "fit-content", mt: "8px", mb: "8px" }}
                startIcon={<DownloadIcon />}
              >
                claim certificate
              </Button>
            </PDFDownloadLink>
          </Box>
        )}
      </List>

      <List>
        {course?.subtitles.map((subtitle) => (
          <Accordion sx={{ borderRadius: "0px !important" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {subtitle.title}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                ({subtitle.hours?.toFixed(1)}) hrs
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List>
                {subtitle.videos.map((video) => (
                  <ListItemButton
                    onClick={() => {
                      setChoosenContent({ type: "video", content: video });
                    }}
                  >
                    <ListItemIcon>
                      <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary={video.title} />
                  </ListItemButton>
                ))}
                {subtitle.exercises.map((exercise) => (
                  <ListItemButton
                    onClick={() => {
                      setChoosenContent({
                        type: "exercise",
                        content: exercise,
                      });
                    }}
                  >
                    <ListItemIcon>
                      <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary={exercise.title} />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Paper>
  );
};

export default CourseContent;
