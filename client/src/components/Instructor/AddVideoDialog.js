import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Alert } from "@mui/material";

export const AddVideoDialog = ({ handleAddVideo }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlert(null);
  };
  const handleSubmit = () => {
    if (title.trim() && url.trim() && duration.trim()) {
      var p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(p)) {
        handleAddVideo({
          title: title,
          url: url,
          description: description,
          duration: duration,
        });
        setOpen(false);
      } else {
        setAlert("Please enter a valid youtube url");
      }
    } else {
      setAlert("Please fill all the fields");
    }
  };
  return (
    <div style={{ width: "fit-content" }}>
      <Button
        variant="text"
        style={{ width: "fit-content", marginBottom: "10px" }}
        onClick={handleClickOpen}
      >
        add video
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="title"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="url"
            fullWidth
            variant="standard"
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="duration"
            fullWidth
            type="number"
            variant="standard"
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="description"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />
          {alert && <Alert severity="error">{alert}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
