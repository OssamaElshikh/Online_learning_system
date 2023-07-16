import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Box,
  Rating,
  CircularProgress,
  CardMedia,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getInstructorCourses } from "../../api/course.js";
import PromotionPopUp from "./PromotionPopUp.js";
import { Filter } from "../Course/Filter.js";
import { getInstructorCoursesFiltered } from "../../api/instructor.js";
import { RatingPopUp } from "./RatingPopUp.js";
import { getCourse, getRatingsAndReviews } from "../../api/course";

export const InstructorCourses = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId] = React.useState("");
  const [filters, setFilters] = React.useState({
    price: [0, 1000],
    rating: [0, 5],
    subject: null,
    search: "",
  });
  const [openRating, setOpenRating] = React.useState(false);
  const [ratingsAndReviews, setRatingsAndReviews] = React.useState([]);

  const fetchCourses = async () => {
    setIsLoading(true);
    const filteredCourses = await getInstructorCoursesFiltered(filters);
    setCourses(filteredCourses);
    setIsLoading(false);
  };
  React.useEffect(() => {
    console.log("This is the filters", filters);
    fetchCourses();
  }, [filters]);
  if (isLoading) {
    return <CircularProgress />;
  }
  const handleClick = (id) => {
    setCourseId(id);
    setOpen(true);
  };
  const handleOpenRating = (id) => {
    const fetchRatingAndReviews = async () => {
      try {
        const res = await getRatingsAndReviews(id);
        console.log(res.data);
        setRatingsAndReviews(res.data);
      } catch (error) {
        console.log(error);
      }
      setOpenRating(true);
    };
    fetchRatingAndReviews();
  };

  return (
    <div>
      <Grid
        container
        marginLeft={"auto"}
        marginRight={"auto"}
        marginTop={"40px"}
      >
        <Grid item xs={2}>
          <Filter setFilters={setFilters} filters={filters} />
        </Grid>

        <Grid item xs textAlign={"center"}>
          <Grid
            container
            spacing={2}
            width={700}
            marginLeft={"auto"}
            marginRight={"auto"}
          >
            {courses?.map((course) => (
              <Grid item xs={6}>
                <Card sx={{ width: 345, height: 300 }} key={course}>
                  <CardHeader title={course.title} />
                  {/* <CardMedia component="img" height="50" /> */}
                  <CardContent>
                    <Rating readOnly value={course.rating}></Rating>
                    <Stack direction="row" spacing={2}>
                      <Typography>${course.price}</Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <AccessTimeIcon />
                        <Typography variant="body2">
                          {course.hours.toFixed(2)}hr
                        </Typography>
                      </div>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {course.summary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleOpenRating(course._id);
                      }}
                    >
                      View Ratings And Reviews
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleClick(course._id);
                      }}
                    >
                      Define Promotion
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <PromotionPopUp
          open={open}
          setOpen={setOpen}
          courseId={courseId}
          fetchCourses={fetchCourses}
        />
        <RatingPopUp
          open={openRating}
          setOpen={setOpenRating}
          ratingsAndReviews={ratingsAndReviews}
        />
      </Grid>
    </div>
  );
};
