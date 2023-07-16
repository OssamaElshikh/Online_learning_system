import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signup } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { spacing } from "@mui/system";
import { Policy } from "./Policy";

const theme = createTheme();

export const SignUpPage = () => {
  const [selectedGender, setSelectedGender] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      gender: selectedGender,
    };
    if (accepted) {
      try {
        const { result, token, role } = await signup(form);
        localStorage.setItem(
          "profile",
          JSON.stringify({ result, token, role })
        );
        console.log(result);
        history.push("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  type="text"
                  value={selectedGender}
                  label="Gender"
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                  }}
                  size="small"
                  sx={{ width: "30%" }}
                  name="gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                {error && (
                  <Typography variant="body2" color="error">
                    Please accept the company's payment and refund policy
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      value="accept"
                      color="primary"
                      onChange={() => {
                        setAccepted((prev) => !prev);
                        if (accepted) setError(false);
                      }}
                      required
                    />
                  }
                  label={
                    <>
                      <Stack direction="row" spacing={0.5}>
                        <Typography variant="body2">
                          I accept the company's
                        </Typography>

                        <Link
                          variant="body2"
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          payment and refund policy
                        </Link>
                      </Stack>
                    </>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    history.push("/auth");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Policy open={open} setOpen={setOpen} />
    </ThemeProvider>
  );
};
