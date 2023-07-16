import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";

export const CourseRatingsPopUp = ({ courseId, open, setOpen }) => {
  const [course, setCourse] = React.useState({});
  const [ratings, setRatings] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {}, []);
  const fetchCourse = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf="center">{"Ratings and Reviews"}</DialogTitle>
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
      </Dialog>
    </div>
  );
};
