import * as React from "react";
import { getCourses } from "../../api/course";
import {
  Chip,
  Divider,
  Grid,
  Paper,
  Button,
  Typography,
  Card,
  Stack,
  Rating,
  CardContent,
  ButtonBase,
  CardActions,
  CardHeader,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AdminPromotionPopUp from "./AdminPromotionPopUp";

export const DefinePromotions = () => {
  const [courses, setCourses] = React.useState([]);
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const today = new Date();

  React.useEffect(() => {
    setIsLoading(true);
    fetchCourses();
    setIsLoading(false);
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await getCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedCourses([]);
    } else {
      setAllSelected(true);
      let ids = [];
      courses?.forEach((course) => ids.push(course._id));
      setSelectedCourses(ids);
    }
  };
  const handleSelect = (course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemove = (course) => {
    setSelectedCourses(
      selectedCourses.filter((selectedCourse) => selectedCourse !== course)
    );
  };
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Grid container spacing={2} columnSpacing={5}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {allSelected ? (
              <Button
                style={{
                  padding: "12px",
                  textTransform: "none",
                }}
                color="success"
                variant="contained"
                startIcon={<CheckBoxIcon />}
                onClick={handleSelectAll}
              >
                Select All
              </Button>
            ) : (
              <Button
                style={{
                  padding: "12px",
                  textTransform: "none",
                }}
                variant="contained"
                startIcon={<CheckBoxOutlineBlankIcon />}
                onClick={handleSelectAll}
              >
                Select All
              </Button>
            )}
            <Button variant="contained" onClick={() => setOpen(true)}>
              Define Promotion
            </Button>
          </Stack>
        </Grid>
        {courses?.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: 200, width: 300, position: "relative" }}>
              <CardContent>
                {selectedCourses?.includes(course._id) ? (
                  <Button
                    style={{
                      padding: "12px",
                      textTransform: "none",
                    }}
                    color="success"
                    variant="contained"
                    startIcon={<CheckBoxIcon />}
                    onClick={() => handleRemove(course._id)}
                  >
                    Unselect Course
                  </Button>
                ) : (
                  <Button
                    style={{
                      padding: "12px",
                      textTransform: "none",
                    }}
                    variant="contained"
                    startIcon={<CheckBoxOutlineBlankIcon />}
                    onClick={() => handleSelect(course._id)}
                  >
                    Select Course
                  </Button>
                )}
                <Typography variant="h6">{course?.title}</Typography>
                <Typography variant="body2">
                  {course?.instructor.name}
                </Typography>
                {course?.discount &&
                new Date(course?.discount?.startDate) < today &&
                new Date(course?.discount?.endDate) > today ? (
                  <Stack direction={"row"} spacing={1}>
                    <Typography>{`$${
                      course?.price * (1 - course?.discount?.value)
                    }`}</Typography>
                    <s>{`$${course?.price}`}</s>
                  </Stack>
                ) : (
                  <Typography>{`$${course?.price}`}</Typography>
                )}
              </CardContent>
              <CardActions>
                <Box
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 5,
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                  }}
                ></Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AdminPromotionPopUp
        open={open}
        setOpen={setOpen}
        courses={selectedCourses}
        fetchCourses={fetchCourses}
      />
    </div>
  );
};
