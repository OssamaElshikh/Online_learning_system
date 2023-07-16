import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import { Stack } from "@mui/system";
import WalletIcon from "@mui/icons-material/Wallet";
import StarRateIcon from "@mui/icons-material/StarRate";
import EditIcon from "@mui/icons-material/Edit";
import { EditProfile } from "./EditProfile";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { RatingsAndReviews } from "./RatingsAndReviews";
import { ReportedProblems } from "./ReportedProblems";
import { Resolved } from "./Resolved";

export const Profile = () => {
  const [currentPage, setCurrentPage] = React.useState("home");
  const user = JSON.parse(localStorage.getItem("profile"));
  let content = null;
  switch (currentPage) {
    case "editProfile":
      content = <EditProfile />;
      break;
    case "myRatingsAndReviews":
      content = <RatingsAndReviews />;
      break;
    case "reportedProblems":
      content = <ReportedProblems />;
      break;
    case "resolvedProblems":
      content = <Resolved />;
      break;
  }
  return (
    <Grid container spacing={2} marginTop={0.2}>
      <Grid item xs={3}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.main",
            borderRadius: "10px",
            height: "200",
          }}
          spacing={2}
        >
          <Typography variant="h6" color={"white"} fontWeight="bold">
            {user?.result?.firstName} {user?.result?.lastName}
          </Typography>
          {user?.role === "instructor" && (
            <Rating
              precision={0.5}
              value={user?.result?.rating}
              readOnly
              style={{ color: "white" }}
            ></Rating>
          )}
          {user?.role !== "corporateTrainee" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "whiteSmoke",
                borderRadius: "10px",
                alignItems: "center",
              }}
              width={"100%"}
            >
              <WalletIcon />
              <Typography variant="body" color={"black"} fontWeight="bold">
                Wallet: {user?.result?.wallet.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Stack>
        <List style={{ backgroundColor: "#eeeeee" }}>
          <ListItem button onClick={() => setCurrentPage("editProfile")}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
          {user?.role === "instructor" && (
            <ListItem
              button
              onClick={() => setCurrentPage("myRatingsAndReviews")}
            >
              <ListItemIcon>
                <StarRateIcon />
              </ListItemIcon>
              <ListItemText primary="My Ratings and Reviews" />
            </ListItem>
          )}
          <ListItem button onClick={() => setCurrentPage("resolvedProblems")}>
            <ListItemIcon>
              <GppGoodIcon />
            </ListItemIcon>
            <ListItemText primary="Resolved Problems" />
          </ListItem>
          <ListItem button onClick={() => setCurrentPage("reportedProblems")}>
            <ListItemIcon>
              <ReportProblemIcon />
            </ListItemIcon>
            <ListItemText primary="Reported Problems" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={9}>
        {content}
      </Grid>
    </Grid>
  );
};
