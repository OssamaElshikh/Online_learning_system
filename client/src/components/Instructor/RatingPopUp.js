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
import { getCourse, getRatingsAndReviews } from "../../api/course";
import { RatingCard } from "./RatingCard.js";
export const RatingPopUp = ({ open, setOpen, ratingsAndReviews }) => {
  console.log(ratingsAndReviews);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf="center">{"Ratings and Reviews"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack spacing={1}>
              {ratingsAndReviews.map((ratingAndReview) => (
                <div>
                  <RatingCard
                    rating={ratingAndReview.rating}
                    review={ratingAndReview.review}
                    trainee={
                      ratingAndReview.individualTrainee
                        ? ratingAndReview.individualTrainee
                        : ratingAndReview.corporateTrainee
                    }
                  />
                </div>
              ))}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
