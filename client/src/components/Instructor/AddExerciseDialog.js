import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Alert } from "@mui/material";
import { set } from "mongoose";

export const AddExerciseDialog = ({ handleAddExercise }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [titleAdded, setTitleAdded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");
  const [option_4, setOption_4] = useState("");
  const [correctOption, setCorrectOption] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlert(null);
    setTitleAdded(false);
    setQuestions([]);
    setTitle("");
    setQuestionTitle("");
    setOption_1("");
    setOption_2("");
    setOption_3("");
    setOption_4("");
    setCorrectOption(0);
  };
  const handleNewQuestion = () => {
    if (!titleAdded) {
      if (title.trim()) {
        setTitleAdded(true);
        setAlert(null);
      } else {
        setAlert("Please enter a title for the exercise");
      }
    } else {
      if (
        questionTitle.trim() &&
        option_1.trim() &&
        option_2.trim() &&
        option_3.trim() &&
        option_4.trim() &&
        correctOption
      ) {
        if (correctOption > 4 || correctOption < 1) {
          setAlert("Please enter a valid correct option");
          return;
        }

        setQuestions([
          ...questions,
          {
            questionTitle,
            options: [option_1, option_2, option_3, option_4],
            correctAnswer: Number(correctOption),
          },
        ]);
        setAlert(null);
        setQuestionTitle("");
        setOption_1("");
        setOption_2("");
        setOption_3("");
        setOption_4("");
        setCorrectOption(0);
      } else {
        setAlert("Please fill all the fields");
      }
    }
  };
  const handleSubmit = () => {
    if (
      questionTitle.trim() &&
      option_1.trim() &&
      option_2.trim() &&
      option_3.trim() &&
      option_4.trim() &&
      correctOption
    ) {
      if (correctOption > 4 || correctOption < 1) {
        setAlert("Please enter a valid correct option");
        return;
      }
      console.log(questions, "questions", questions.length);
      if (questions.length >= 0) {
        handleAddExercise({
          title,
          questions: [
            ...questions,
            {
              questionTitle,
              options: [option_1, option_2, option_3, option_4],
              correctAnswer: Number(correctOption),
            },
          ],
        });
        console.log([
          ...questions,
          {
            questionTitle,
            options: [option_1, option_2, option_3, option_4],
            correctAnswer: Number(correctOption),
          },
        ]);
        setAlert(null);
        setQuestionTitle("");
        setOption_1("");
        setOption_2("");
        setOption_3("");
        setOption_4("");
        setCorrectOption(0);
      } else {
        setAlert("Please add at least one question");
      }

      setTitleAdded(false);
      setQuestions([]);
      setTitle("");
      handleClose();
    } else {
      setAlert("Please fill all the fields");
    }
  };
  return (
    <div style={{ width: "fit-content" }}>
      <Button
        variant="text"
        style={{ width: "fit-content", marginBottom: "10px" }}
        onClick={handleClickOpen}
      >
        add exercise
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add exercise</DialogTitle>
        <DialogContent>
          {!titleAdded && (
            <TextField
              autoFocus
              margin="dense"
              label="title"
              fullWidth
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {titleAdded && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Question"
                fullWidth
                variant="standard"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="option 1"
                fullWidth
                variant="standard"
                value={option_1}
                onChange={(e) => setOption_1(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="option 2"
                fullWidth
                variant="standard"
                value={option_2}
                onChange={(e) => setOption_2(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="option 3"
                fullWidth
                variant="standard"
                value={option_3}
                onChange={(e) => setOption_3(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="option 4"
                fullWidth
                variant="standard"
                value={option_4}
                onChange={(e) => setOption_4(e.target.value)}
              />

              <TextField
                autoFocus
                margin="dense"
                label="correct answer (1-4)"
                fullWidth
                type="number"
                variant="standard"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
              />
            </>
          )}
          {alert && <Alert severity="error">{alert}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewQuestion}>New question</Button>
          {titleAdded && (
            <Button onClick={handleSubmit}>Create exercise</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
