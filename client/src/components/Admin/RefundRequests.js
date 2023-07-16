import * as React from "react";
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
import {
  getRefundRequests,
  acceptRefundRequest,
  rejectRefundRequest,
} from "../../api/admin";

export const RefundRequests = () => {
  const [refundRequests, setRefundRequests] = React.useState([]);

  React.useEffect(() => {
    fetchRefundRequests();
  }, []);

  const fetchRefundRequests = async () => {
    try {
      const requests = await getRefundRequests();
      setRefundRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (
    refundId,
    courseId,
    individualTraineeId,
    instructorId
  ) => {
    try {
      const request = await acceptRefundRequest(
        refundId,
        courseId,
        individualTraineeId,
        instructorId
      );
      setRefundRequests(request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (refundId) => {
    try {
      const request = await rejectRefundRequest(refundId);
      setRefundRequests(request);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        {refundRequests?.map((request) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: 160, width: 300, position: "relative" }}>
              <CardContent>
                <Typography>{`${request.individualTrainee?.email} wants to refund his money from (${request.course.title})`}</Typography>
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
                    onClick={() => {
                      handleAccept(
                        request._id,
                        request.course._id,
                        request.individualTrainee._id,
                        request.instructor._id
                      );
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleReject(request._id);
                    }}
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
