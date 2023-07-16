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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signup } from "../../api/auth";
import { useHistory } from "react-router-dom";
import {
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
  Alert,
} from "@mui/material";
import { spacing } from "@mui/system";
import { createUser } from "../../api/admin";
const theme = createTheme();
export const CreateUser = () => {
  const [selectedRole, setSelectedRole] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const [alert, setAlert] = React.useState(null);

  const handleSubmit = async (event) => {
    console.log("submit");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      userName: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      gender: selectedGender,
      role: selectedRole,
    };
    if (
      form.firstName.trim &&
      form.lastName.trim &&
      form.email.trim &&
      form.password.trim &&
      form.confirmPassword.trim &&
      form.gender &&
      form.role
    ) {
      setAlert(null);
      if (form.password === form.confirmPassword) {
        setAlert(null);
        const res = await createUser(form);

        if (res.constructor.name !== "AxiosError") {
          setAlert({
            severity: "success",
            message: "User created successfully",
          });
        } else {
          setAlert({ severity: "error", message: res.message });
        }
      } else {
        setAlert({ severity: "error", message: "Passwords do not match" });
      }
    } else {
      setAlert({ severity: "error", message: "Please fill all the fields" });
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
            <PersonAddAltIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Create User
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    value={selectedRole}
                    label="Role"
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                    }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Instructor">Instructor</MenuItem>
                    <MenuItem value="Corporate trainee">
                      corporate trainee
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
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

              {alert && (
                <Grid item xs={12}>
                  <Alert severity={alert.severity}>{alert.message}</Alert>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
