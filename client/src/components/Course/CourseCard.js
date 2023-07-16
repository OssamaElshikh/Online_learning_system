import * as React from "react";

import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import courseImage from "../../assets/course.jpeg";
import { useHistory } from "react-router-dom";
import { Stack } from "@mui/system";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
export const CourseCard = ({ course }) => {
  const history = useHistory();
  const country = useSelector((state) => state.country.value);
  let price = course.price;
  let newPrice = null;
  if (course.discount) {
    const today = new Date();
    const startDate = new Date(course.discount.startDate);
    const endDate = new Date(course.discount.endDate);

    if (startDate < today && endDate > today) {
      newPrice = course.price * (1 - course.discount.value);
      newPrice = Math.round(newPrice * country.rate * 100) / 100;
    }
  }
  price = Math.round(price * country.rate * 100) / 100;
  return (
    <CardActionArea component="a">
      <Card
        sx={{ display: "flex" }}
        onClick={() => history.push(`/coursePage/${course._id}`)}
      >
        <CardContent sx={{ flex: 1, maxHeight: 200 }}>
          <Typography component="h2" variant="h5">
            {course?.title}
          </Typography>

          {newPrice ? (
            <>
              <Typography
                display="inline"
                variant="subtitle1"
                color="text.secondary"
                style={{ marginRight: "5px" }}
              >
                {course ? newPrice + " " + country.currency : ""}
              </Typography>

              <Typography
                display="inline"
                variant="subtitle1"
                color="text.secondary"
                style={{ fontSize: "0.7rem" }}
              >
                <s>
                  {course
                    ? Math.round(course.price * country.rate * 100) / 100 +
                      " " +
                      country.currency
                    : ""}
                </s>
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle1" color="text.secondary">
              {course
                ? Math.round(course.price * country.rate * 100) / 100 +
                  " " +
                  country.currency
                : ""}
            </Typography>
          )}
          <Stack direction={"row"} spacing={2}>
            <Stack item xs={6} textAlign={"center"}>
              <Rating readOnly value={course.rating}></Rating>
            </Stack>
            <Stack item xs={6} textAlign={"center"}>
              <Stack direction={"row"} spacing={0.5}>
                <AccessTimeIcon />
                <Typography variant="body2">
                  {course.hours.toFixed(2)}hr
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography fontSize={12} overflow={"scroll"} maxHeight={80}>
            {course?.summary} lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed condimentum, nisl eget ultricies tincidunt, nunc nisl
            aliquam nisl, eu aliquam nunc nisl eget nunc. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          image={courseImage}
          alt={"Course Image"}
        />
      </Card>
    </CardActionArea>
  );
};
