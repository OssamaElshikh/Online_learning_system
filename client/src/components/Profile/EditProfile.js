import { getTrainee } from "../../api/individualTrainee";
import { getCorporateTrainee } from "../../api/corporateTrainee";
import { getInstructorNoID } from "../../api/instructor";
import { editInstructorProfile } from "../../api/instructor";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box, fontSize } from "@mui/system";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { changePassword } from "../../api/users";

export const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [myUser, setMyUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [edit, setEdit] = useState({ email: true, biography: true });
  useEffect(() => {
    const fetchUser = async () => {
      let res;
      switch (user?.role) {
        case "individualTrainee":
          res = await getTrainee();
          break;
        case "corporateTrainee":
          res = await getCorporateTrainee();
          break;
        case "instructor":
          res = await getInstructorNoID();
          break;
        default:
          res = null;
          break;
      }

      if (res.constructor.name !== "AxiosError") {
        setMyUser(res);
        console.log(res);
      } else {
        console.log(res.message);
      }
    };

    fetchUser();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setAlert(null);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    console.log(password, confirmPassword);
    try {
      setLoading(true);
      await changePassword(password, confirmPassword, myUser._id);
      setLoading(false);
      setAlert({
        severity: "success",
        message: "Password changed successfully",
      });
    } catch (error) {
      console.log(error);
      setAlert({ severity: "error", message: error.response.data.message });
      setLoading(false);
    }
  };

  const handleChangeBioEmail = async (e) => {
    e.preventDefault();
    setAlert(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const biography = formData.get("biography");
    console.log({ email, biography });

    try {
      setLoading(true);
      await editInstructorProfile({ email, biography });
      setLoading(false);
      setAlert({
        severity: "success",
        message: "information changed successfully",
      });
    } catch (error) {
      setAlert({ severity: "error", message: error.response.data.message });
      setLoading(false);
    }
  };

  const disabled = {
    fullWidth: true,
    id: "lastName",
    label: "Last Name",
    name: "lastName",
    autoComplete: "family-name",
    disabled: true,
  };
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <h1>Edit Profile</h1>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <h4>personal information</h4>
      {myUser && (
        <Stack spacing={2} direction="column" justifyContent="center">
          <TextField
            disabled
            id="First"
            label="First Name"
            defaultValue={myUser.firstName}
          />
          <TextField
            disabled
            id="Last"
            label="Last Name"
            defaultValue={myUser.lastName}
          />

          {user?.role === "instructor" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              component="form"
              noValidate
              onSubmit={handleChangeBioEmail}
            >
              <Button
                variant="text"
                sx={{
                  color: "button.main",
                  fontSize: "0.75rem",
                  width: "fit-content",
                  alignSelf: "flex-end",
                }}
                onClick={() => setEdit({ ...edit, email: !edit.email })}
              >
                Edit
              </Button>
              <TextField
                disabled={edit.email}
                id="email"
                name="email"
                label="Email"
                defaultValue={myUser.email}
              />
              <Button
                variant="text"
                sx={{
                  color: "button.main",
                  fontSize: "0.75rem",
                  width: "fit-content",
                  alignSelf: "flex-end",
                }}
                onClick={() => setEdit({ ...edit, biography: !edit.biography })}
              >
                Edit
              </Button>
              <TextField
                disabled={edit.biography}
                id="biography"
                name="biography"
                label="Biography"
                defaultValue={myUser.biography}
              />
              {(!edit.biography || !edit.email) && (
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    width: "fit-content",
                    mt: "20px",
                    color: "button.main",
                    mb: "20px",
                  }}
                >
                  save
                </Button>
              )}
            </Box>
          ) : (
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              defaultValue={myUser.email}
            />
          )}

          <h4>change password</h4>

          <Box component="form" noValidate onSubmit={handleChangePassword}>
            <Stack spacing={2} direction="column" justifyContent="center">
              <TextField
                disabled={false}
                name="password"
                id="password"
                label="new password"
                type={"password"}
                required
              />
              <TextField
                disabled={false}
                id="confirmPassword"
                name="confirmPassword"
                label="confirm password"
                type={"password"}
                required
              />
              <Button
                variant="outlined"
                sx={{
                  width: "fit-content",
                  color: "button.main",
                  marginBottom: "20px !important",
                }}
                type="submit"
              >
                change
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </div>
  );
};
