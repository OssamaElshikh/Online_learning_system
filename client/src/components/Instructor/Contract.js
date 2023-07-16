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
import { set } from "mongoose";
import * as React from "react";

export const Contract = ({
  open,
  setOpen,
  accepted,
  setAccepted,
  setAlert,
}) => {
  return (
    <div>
      <Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle alignSelf="center">{"Course contract"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6" gutterBottom component="div">
                by accepting this policy you agree to the following terms:
                <br />
                <br />
                you have copyrights to all the content you upload to the site
                including but not limited to images, videos, and material
                <br />
                you understand that the site is not responsible for any content
                uploaded by users
                <br />
                you aknowladge that a percentage of your earnings will be taken
                by the site for each video per registered trainee
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setAccepted(true);
                setAlert(null);
              }}
            >
              accept
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setAccepted(false);
                setAlert("you must accept the contract to create a course");
              }}
            >
              Deny
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
