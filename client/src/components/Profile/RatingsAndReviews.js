import {
  Alert,
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import * as React from "react";
import { getRatingsAndReviews } from "../../api/instructor";
import PersonIcon from "@mui/icons-material/Person";

export const RatingsAndReviews = () => {
  const [ratingsAndReviews, setRatingsAndReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  React.useEffect(() => {
    fetchRatingsAndReviews();
  }, []);

  const fetchRatingsAndReviews = async () => {
    try {
      setLoading(true);
      const data = await getRatingsAndReviews(user?.result?._id);
      setRatingsAndReviews(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {ratingsAndReviews?.map((ratingAndReview) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={ratingAndReview._id}>
            <Card
              sx={{ display: "flex", alignItems: "center", minHeight: 200 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  <PersonIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 500 }}
                  >
                    {ratingAndReview?.individualTrainee?.firstName}{" "}
                    {ratingAndReview?.individualTrainee?.lastName}
                    {ratingAndReview?.corporateTrainee?.firstName}{" "}
                    {ratingAndReview?.corporateTrainee?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ratingAndReview.review}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  precision={0.5}
                  name="read-only"
                  value={ratingAndReview.rating}
                  readOnly
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
