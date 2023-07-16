import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  FormControl,
} from "@mui/material";
import { getUserReportedProblems, followUp } from "../../api/users";

export const ReportedProblems = () => {
  const [reportedProblems, setReportedProblems] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  React.useEffect(() => {
    fetchUserReportedProblems();
  }, []);
  const fetchUserReportedProblems = async () => {
    const { data } = await getUserReportedProblems(user?.result?._id);
    setReportedProblems(data);
  };

  const handleSubmit = async (e, problemId) => {
    e.preventDefault();
    const followUpMessage = e.target.follow.value;
    await followUp(problemId, followUpMessage);
    fetchUserReportedProblems();
  };

  return (
    <div>
      <Grid container spacing={20}>
        {reportedProblems?.map((problem) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{
                height: 300,
                width: 300,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                flexGrow: 2,
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography>{problem.course.title}</Typography>
                  <Typography fontSize={12} color="grey">
                    {`Problem Type: ${problem.problemType}`}
                  </Typography>
                  <Typography
                    fontSize={12}
                    color="grey"
                  >{`Status: ${problem.status}`}</Typography>
                  <Typography fontSize={12} color="grey">
                    {`Message: ${problem.problem}`}
                  </Typography>
                  <Box
                    component="form"
                    fullWidth
                    size="small"
                    variant="standard"
                    onSubmit={(e) => handleSubmit(e, problem._id)}
                  >
                    <TextField
                      label="Follow Up"
                      size="large"
                      fullWidth
                      name="follow"
                    />
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 5,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        width: "100%",
                      }}
                    >
                      <Button type="submit" variant="contained" color="button">
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
