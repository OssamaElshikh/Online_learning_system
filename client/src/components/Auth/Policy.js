import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import * as React from "react";

export const Policy = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle alignSelf="center">{"Refund Policy"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6" gutterBottom component="div">
                We offer a full refund for any course purchased on our website
                if the request and the student has not progressed past 50% of
                the course material. If the student has progressed past 50% of
                the course material, we are unable to offer a refund.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
