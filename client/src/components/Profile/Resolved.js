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
import { getResolvedUserProblems } from "../../api/users";

export const Resolved = () => {
  const [reportedProblems, setReportedProblems] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  React.useEffect(() => {
    fetchUserReportedProblems();
  }, []);
  const fetchUserReportedProblems = async () => {
    const { data } = await getResolvedUserProblems(user?.result?._id);
    setReportedProblems(data);
  };

  return (
    <div>
      <Grid container spacing={20}>
        {reportedProblems?.map((problem) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{
                height: 200,
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
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
