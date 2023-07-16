import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import { Stack } from "@mui/system";

import courseImage from "../assets/course.jpeg";
import { useHistory } from "react-router-dom";

export const SliderPopular = ({ courses }) => {
  const history = useHistory();
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#808080" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div style={{ width: "1200px", marginLeft: "auto", marginRight: "auto" }}>
      <Slider {...settings}>
        {courses?.map((course, index) => {
          return (
            <Card elevation={0} key={index} sx={{ width: 200, height: 400 }}>
              <CardMedia
                component="img"
                image={courseImage}

                // onMouseOver={(event) => handleMouseOver(event, item.title)}
                // onMouseOut={handleMouseOut}
              ></CardMedia>

              <CardContent sx={{ maxHeight: 100 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {course?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  overflow={"hidden"}
                  maxHeight={"45px"}
                >
                  {course?.summary}
                </Typography>

                <Stack spacing={1} direction="row">
                  <p>{parseFloat(course?.rating)}</p>
                  <Rating
                    precision={0.5}
                    defaultValue={parseFloat(course?.rating)}
                    readOnly
                    sx={{ alignItems: "center" }}
                  ></Rating>
                  <GroupIcon fontSize="small" style={{ alignSelf: "center" }} />
                  <p style={{ alignSelf: "center" }}>{course?.n_enrolled}</p>
                </Stack>
                <Typography variant="body1" fontWeight="bold">
                  {/* {rates.isLoading? <CircularProgress></CircularProgress>:
                  getRate(selectedCountry, course.price, rates.currencyRates)} */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => history.push(`/coursePage/${course._id}`)}
                  variant="outlined"
                  size="small"
                >
                  View
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
