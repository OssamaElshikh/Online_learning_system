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
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
} from "@mui/material";

export const RatingCard = ({ rating, review, trainee }) => {
  return (
    <div>
      <Card sx={{ width: "400px" }}>
        <CardHeader
          title={trainee.firstName + " " + trainee.lastName}
          subheader={trainee.email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {review}
          </Typography>
        </CardContent>
        <CardActions>
          <Rating readOnly value={rating}></Rating>
        </CardActions>
      </Card>
    </div>
  );
};
