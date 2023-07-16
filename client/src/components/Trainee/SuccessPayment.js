import { Button, CircularProgress, Container, Grid } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { enrollTrainee } from "../../api/course";
import { useHistory } from "react-router-dom";

export const SuccessPage = () => {
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  const { token, role } = JSON.parse(localStorage.getItem("profile"));
  const urlParams = new URLSearchParams(window.location.search);
  const traineeId = urlParams.get("traineeId");
  const courseId = urlParams.get("courseId");
  const instructorId = urlParams.get("instructorId");
  const priceToPay = urlParams.get("priceToPay");

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, []);

  const enroll = async () => {
    try {
      if (enrollLoading) return;
      setEnrollLoading(true);
      const { data } = await enrollTrainee(
        courseId,
        traineeId,
        instructorId,
        priceToPay
      );
      const result = data;
      localStorage.setItem("profile", JSON.stringify({ result, role, token }));

      setEnrollLoading(false);
      history.push(`/coursePage/${courseId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    enroll();
  };

  return (
    <Container>
      <Grid container>
        <Grid mt={30} textAlign="center" item xs={12}>
          <h1>Thank you for your purchase</h1>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <h3>Redirecting to the course page</h3>
        </Grid>

        {spinner ? (
          <Grid mt={5} textAlign="center" item xs={12}>
            <CircularProgress
              style={{
                textAlign: "center",
              }}
            ></CircularProgress>
          </Grid>
        ) : (
          <Container
            sx={{
              textAlign: "center",
            }}
            variant="contained"
          ></Container>
        )}
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" onClick={handleClick}>
            Click Here
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
