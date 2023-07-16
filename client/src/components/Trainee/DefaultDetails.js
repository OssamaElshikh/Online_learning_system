import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  List,
  Stack,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  Avatar,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material";
import { Link } from "@mui/material";

export const DefaultDetails = ({ course }) => {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {!isLoading && (
        <>
          <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }}>
            Preview video
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ReactPlayer
              url={course?.previewVideo}
              width="60%"
              controls
              playing
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "100px",
              ml: 10,
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "1.8rem" }}>
              About
            </Typography>
            <Typography variant="h6" sx={{ color: "#655e5e", mb: 5 }}>
              Created By:
              <Link
                color="button.main"
                onClick={() =>
                  history.push(
                    `/coursePage/instructorPage/${course?.instructor?.id}`
                  )
                }
              >
                {" "}
                {course?.instructor.name}
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ pb: 3, color: "#868383" }}>
              {course?.description
                ? course?.description
                : "lorem ipsum dolor sit amet, consectetur adipiscing  elit. Sed condimentum, nisl eget ultricies tincidunt, nunc nisl  aliquam nisl, eu aliquam nunc nisl eget nunc. Nulla facilisi. Nulla  facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla"}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DefaultDetails;
