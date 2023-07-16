import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { reportProblem } from "../../api/users";

export const ProblemPopUp = ({ courseId, open, setOpen }) => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setAlert(null);
      const res = await reportProblem(
        courseId,
        user?.result?._id,
        formData.get("issue"),
        selectedIssue
      );

      if (res.constructor.name !== "AxiosError") {
        setAlert({
          severity: "success",
          message: "Problem reported successfully",
        });
      }
    } catch (err) {
      setAlert({ severity: "error", message: err.message });
    }
    setTimeout(() => {
      setOpen(false);
      setAlert(null);
    }, 3000);
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Problem</DialogTitle>

      <Box
        component="form"
        sx={{ width: "100%" }}
        display="flex"
        flexDirection={"column"}
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <DialogContentText>
            <Select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              sx={{ marginBottom: "1rem", width: "50%" }}
            >
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Financial">Financial</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Describe your issue"
              name="issue"
            ></TextField>
            {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
