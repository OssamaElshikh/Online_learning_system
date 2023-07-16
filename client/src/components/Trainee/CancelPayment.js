import { CircularProgress, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const CancelPayment = () => {
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
      history.push(`/home`);
    }, 3000);
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid mt={30} textAlign="center" item xs={12}>
          <h1>Something went wrong!</h1>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <h3>Redirecting to home page</h3>
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
      </Grid>
    </Container>
  );
};
