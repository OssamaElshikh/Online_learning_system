import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Stack,
  TextField,
  Button,
} from "@mui/material";

export const TraineeRatingPop = ({ open, setOpen, handleSubmit }) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleSub = () => {
    handleSubmit(rating, review);
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf="center">
          {"Leave a Rating and Review"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack spacing={3}>
              <Rating
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Rating>
              <TextField
                id="outlined-multiline-static"
                label="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></TextField>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSub}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
