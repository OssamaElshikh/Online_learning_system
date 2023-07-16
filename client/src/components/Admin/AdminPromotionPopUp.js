import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { definePromotion, getInstructorCourses } from "../../api/instructor";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminPromotionPopUp({
  open,
  setOpen,
  courses,
  fetchCourses,
}) {
  const [startDate, setStartDate] = useState(dayjs(Date.now()));
  const [endDate, setEndDate] = useState(dayjs(Date.now()));
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };
  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };
  const handleChangeDiscount = (e) => {
    setDiscount(e.target.value);
    if (e.target.value <= 0 || e.target.value >= 100) {
      setDiscountError(true);
    } else {
      setDiscountError(false);
    }
  };
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (discountError || dateError) {
    } else {
      courses.map((course) => {
        definePromotion(course, discount, startDate, endDate);
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setTimeout(() => {
        fetchCourses();
        setOpen(false);
      }, 4000);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf="center">{"Define a promotion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TextField
                  label="Discount"
                  onChange={handleChangeDiscount}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  required
                  error={discountError}
                />
                <DesktopDatePicker
                  label="Start date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={handleChangeStart}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={dayjs(Date.now())}
                  onError={(error) => {
                    setDateError(true);
                  }}
                />
                <DesktopDatePicker
                  label="End date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={handleChangeEnd}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={startDate}
                  onError={(error) => {
                    setDateError(true);
                  }}
                />
                {success && (
                  <Stack direction="row" spacing={1}>
                    <Alert severity="success">
                      Successfuly defined the promotion
                    </Alert>
                    <CircularProgress
                      style={{
                        color: "green",
                        width: "20px",
                        height: "20px",
                        marginTop: "10px",
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
