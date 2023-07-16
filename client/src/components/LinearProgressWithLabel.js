import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: "34px" }}>
      <Box
        sx={{
          width: "80%",
        }}
      >
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ borderRadius: "5px" }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ val }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={val} />
    </Box>
  );
}
