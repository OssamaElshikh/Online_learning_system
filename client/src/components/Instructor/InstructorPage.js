import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";

import { useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { addRating, getInstructor } from "../../api/instructor";
import { InstructorRatingPopUp } from "./InstructorRatingPopUp";

export const InstructorPage = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [alert, setAlert] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userObject, setUserObject] = React.useState(user?.result);
  React.useEffect(() => {
    setIsLoading(true);
    fetchInstructor();
    setIsLoading(false);
  }, []);
  const fetchInstructor = async () => {
    const instructor = await getInstructor(id);
    setInstructor(instructor);
  };
  React.useEffect(() => {
    setValue(instructor?.rating);
  }, [instructor]);

  const handleSubmit = async (rating, review) => {
    try {
      setAlert(null);
      const updatedInstructor = await addRating(
        rating,
        review,
        instructor._id,
        user?.result?._id
      );
      setInstructor(updatedInstructor);

      setAlert({
        severity: "success",
        message: "Thank you for your feedback!",
      });
    } catch (err) {
      setAlert({ severity: "error", message: err.message });
    }
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  if (isLoading) {
    return <CircularProgress />;
  } else
    return (
      <div>
        <Grid
          container
          spacing={2}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={0.5}
          backgroundColor="secondary.main"
          position={"relative"}
          style={{
            width: "100vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={8} textAlign={"center"}>
            <Container sx={{ textAlign: "left" }}>
              <Typography variant="h4">
                {instructor?.firstName} {instructor?.lastName}
              </Typography>

              <Stack direction={"row"} spacing={2}>
                <Stack item xs={4} textAlign={"center"}>
                  <Rating
                    precision={0.5}
                    name="Course Rating"
                    value={value}
                    readOnly
                    style={{ color: "black" }}
                  />
                </Stack>
              </Stack>

              <Divider />
              <Typography fontSize={12}>
                {instructor?.biography}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                condimentum, nisl eget ultricies tincidunt, nunc nisl aliquam
                nisl, eu aliquam nunc nisl eget nunc. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
                facilisi. Nulla
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  position: "absolute",
                  top: 250,
                  paddingTop: 2,
                }}
                spacing={2}
              >
                <Button
                  color="button"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Rate This Instructor
                </Button>

                {alert && (
                  <Grid item xs={12}>
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                  </Grid>
                )}
              </Stack>
            </Container>
          </Grid>

          <Grid item xs={4} textAlign={"center"} paddingRight={2}></Grid>
        </Grid>
        <Container style={{ paddingTop: 30 }}>
          <Typography>Courses By This Instructor:</Typography>
        </Container>
        <InstructorRatingPopUp
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        />
      </div>
    );
};
