import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  Divider,
  InputBase,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const subjects = [
  "programming languages",
  "mathematics",
  "physics",
  "business",
  "chemistry",
  "biology",
  "computer science",
  "economics",
  "finance",
  "history",
  "law",
  "literature",
  "medicine",
  "philosophy",
  "political science",
  "psychology",
  "sociology",
  "statistics",
  "other",
];

export const Filter = ({ setFilters, filters }) => {
  const country = useSelector((state) => state.country.value);
  console.log(filters.price[0], filters.price[1]);
  const [priceFilter, setPriceFilter] = React.useState([
    filters.price[0],
    filters.price[1],
  ]);
  const [ratingFilter, setRatingFilter] = React.useState(filters.rating);
  const [subject, setSubject] = useState(filters.subject);
  const [search, setSearch] = useState(filters.search);
  const [clear, setClear] = useState(false);

  const handlePrice = (event, newValue) => {
    setPriceFilter([newValue[0] / country.rate, newValue[1] / country.rate]);
  };

  const handleRating = (event, newValue) => {
    setRatingFilter(newValue);
    console.log(priceFilter);
  };
  return (
    <Box width="90%" marginLeft="auto">
      <Typography variant="h5" gutterBottom>
        Search{" "}
      </Typography>
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{ endAdornment: <SearchIcon /> }}
      />
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Filters{" "}
        </Typography>
        <Button
          sx={{ fontSize: "0.675rem", color: "button.main" }}
          variant="text"
          onClick={() => {
            setPriceFilter([0, 1000 * country.rate]);
            setRatingFilter([0, 5]);
            console.log(subject);
            setSubject(null);
            setSearch("");
            setClear(!clear);
          }}
        >
          Clear filters
        </Button>
      </div>
      <Typography variant="body" gutterBottom>
        Price{" "}
      </Typography>
      <Slider
        min={0}
        max={1000 * country.rate}
        getAriaLabel={() => "Filter by price"}
        value={[priceFilter[0] * country.rate, priceFilter[1] * country.rate]}
        onChange={handlePrice}
        step={1}
        size="small"
        valueLabelDisplay="auto"
      />
      <Divider sx={{ marginBottom: "10px", marginTop: "10px" }} />
      <Typography variant="body" gutterBottom>
        Rating{" "}
      </Typography>
      <Slider
        getAriaLabel={() => "Filter by rating"}
        value={ratingFilter}
        min={0}
        max={5}
        step={0.1}
        onChange={handleRating}
        size="small"
        valueLabelDisplay="auto"
      />
      <Divider sx={{ marginBottom: "10px", marginTop: "10px" }} />
      <Typography variant="body" gutterBottom>
        Subject
      </Typography>
      <Autocomplete
        sx={{ marginTop: "10px" }}
        disablePortal
        id="combo-box-demo"
        options={subjects}
        key={clear}
        onChange={(e, x) => {
          setSubject(x);
          console.log(x);
        }}
        renderInput={(params) => <TextField {...params} label="Subjects" />}
      />

      <Button
        sx={{
          marginBottom: "10px",
          marginTop: "40px",
          color: "button.main",
          borderColor: "button.main",
        }}
        variant="outlined"
        onClick={() => {
          setFilters({
            price: priceFilter,
            rating: ratingFilter,
            subject: subject,
            search: search,
          });
        }}
      >
        filter
      </Button>
    </Box>
  );
};
