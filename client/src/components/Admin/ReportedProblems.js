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
  Typography,
} from "@mui/material";
import { getReportedProblems, updateProblemStatus } from "../../api/admin";

export const ReportedProblems = () => {
  const [reportedProblems, setReportedProblems] = React.useState([]);
  React.useEffect(() => {
    fetchReportedProblems();
  }, []);
  const fetchReportedProblems = async () => {
    const problems = await getReportedProblems();
    setReportedProblems(problems);
  };

  const handleStatusChange = async (problemId, status) => {
    const problems = await updateProblemStatus(problemId, status);
    setReportedProblems(problems);
  };

  return (
    <div>
      <Grid container spacing={4} columnSpacing={6}>
        {reportedProblems?.map((problem) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: 200, width: 300, position: "relative" }}>
              <CardContent>
                {problem.instructor && (
                  <Typography>{`${problem.instructor?.email} Has a problem with (${problem.course.title})`}</Typography>
                )}
                {problem.corporateTrainee && (
                  <Typography>{`${problem.corporateTrainee?.email} Has a problem with (${problem.course.title})`}</Typography>
                )}
                {problem.individualTrainee && (
                  <Typography>{`${problem.individualTrainee?.email} Has a problem with (${problem.course.title})`}</Typography>
                )}
                <Typography fontSize={12} color="grey">
                  {`Problem Type: ${problem.problemType}`}
                </Typography>
                <Typography
                  fontSize={12}
                  color="grey"
                >{`Message: ${problem.problem}`}</Typography>
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
                    width: "100%",
                  }}
                >
                  <Select
                    type="text"
                    value={problem.status}
                    label="Status"
                    size="small"
                    sx={{ width: "50%" }}
                    name="status"
                    onChange={(e) =>
                      handleStatusChange(problem._id, e.target.value)
                    }
                  >
                    <MenuItem value="unseen">unseen</MenuItem>
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="resolved">resolved</MenuItem>
                  </Select>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
