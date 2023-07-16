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
import { getCoursesFiltered } from "../../api/course.js";
import { useHistory } from "react-router-dom";
import { CourseCard } from "./CourseCard.js";
import { Filter } from "./Filter.js";
export const Courses = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [filters, setFilters] = React.useState({
    price: [0, 1000],
    rating: [0, 5],
    subject: null,
    search: "",
  });

  const history = useHistory();
  const fetchCourses = async () => {
    setIsLoading(true);
    const { data } = await getCoursesFiltered(filters);
    setCourses(data);
    setIsLoading(false);
  };
  React.useEffect(() => {
    console.log("This is the filters", filters);
    fetchCourses();
  }, [filters]);
  if (isLoading) {
    return <CircularProgress />;
  }
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
            width={800}
            marginLeft={"100px"}
            marginRight={"auto"}
          >
            {courses?.map((course) => (
              <Grid item xs={6}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
