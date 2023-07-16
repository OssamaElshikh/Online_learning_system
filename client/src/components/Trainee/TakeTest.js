import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { addExercise as addExerciseIndiv } from "../../api/individualTrainee";
import { addExercise as addExerciseCorporate } from "../../api/corporateTrainee";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
export const TakeTest = ({
  exercise,
  open,
  setOpen,
  setGrade,
  setProgress,
}) => {
  let len;
  if (exercise) {
    len = exercise.questions.length;
  } else {
    len = 0;
  }
  const user = JSON.parse(localStorage.getItem("profile"));

  let arr = new Array(len).fill(null);

  const [answers, setAnswers] = useState(arr);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const correctAnswers = exercise?.questions?.map(
    (question) => question.correctAnswer
  );

  const handleChange = (e, index) => {
    let temp = [...answers];
    temp[index] = Number(e.target.value);
    console.log(temp);
    setAnswers(temp);
  };
  const handleClickOpen = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions");
      return;
    }

    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    const grade = score / len;

    const pushGrade = async () => {
      let res;
      if (user?.role === "individualTrainee") {
        res = await addExerciseIndiv(exercise._id, grade);
      } else {
        res = await addExerciseCorporate(exercise._id, grade);
      }
      if (res.constructor.name !== "AxiosError") {
        setProgress(res.data);
      }
    };
    pushGrade();

    setGrade(grade);
    setIsSubmitted(true);
  };

  const handleCorrected = (questionIndex, ButtonIndex) => {
    if (!isSubmitted) {
      return <Radio />;
    } else {
      if (correctAnswers[questionIndex] === ButtonIndex) {
        return <Radio checked={true} color="success" />;
      } else {
        if (answers[questionIndex] === ButtonIndex) {
          if (answers[questionIndex] !== correctAnswers[questionIndex]) {
            return <Radio checked={true} color="error" />;
          }
        } else {
          return <Radio checked={false} />;
        }
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        minWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{exercise.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {exercise?.questions?.map((question, index) => (
              <>
                <Typography
                  sx={{ marginTop: "5px", marginBottom: "5px" }}
                  variant="h6"
                >
                  {question?.questionTitle}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup onChange={(e) => handleChange(e, index)}>
                    {question?.options?.map((option, j) => (
                      <FormControlLabel
                        value={j + 1}
                        control={handleCorrected(index, j + 1)}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!isSubmitted ? (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
