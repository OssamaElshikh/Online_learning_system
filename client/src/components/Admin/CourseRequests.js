import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  acceptRequest,
  getRequestCourses,
  rejectRequest,
} from "../../api/admin";

export const CourseRequests = () => {
  const [courseRequests, setCourseRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchRquestCourses();
    setLoading(false);
  }, []);
  const fetchRquestCourses = async () => {
    try {
      const requests = await getRequestCourses();
      setCourseRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccept = async (
    courseId,
    corporateTraineeId,
    requestCourseId
  ) => {
    try {
      const newRequests = await acceptRequest(
        courseId,
        corporateTraineeId,
        requestCourseId
      );
      setCourseRequests(newRequests);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (id) => {
    try {
      const newRequests = await rejectRequest(id);
      setCourseRequests(newRequests);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <CircularProgress />;
  return (
    <div>
      <Grid container spacing={2}>
        {courseRequests?.map((request) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: 160, width: 300, position: "relative" }}>
              <CardContent>
                <Typography>{`${request.corporateTrainee.email} wants to access (${request.course.title})`}</Typography>
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
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleAccept(
                        request.course._id,
                        request.corporateTrainee._id,
                        request._id
                      )
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
