import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
export const ViewSolution = ({ exercise, open, setOpen }) => {
  const correctAnswers = exercise?.questions?.map(
    (question) => question.correctAnswer
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleCorrected = (questionIndex, ButtonIndex) => {
    // if question index is correct answer index then checked is true and color is success else checked is false and cannot be checked
    if (ButtonIndex === correctAnswers[questionIndex]) {
      return <Radio checked color="success" />;
    }
    return <Radio disabled={true} />;
  };

  return (
    <div>
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
                  <RadioGroup>
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
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
