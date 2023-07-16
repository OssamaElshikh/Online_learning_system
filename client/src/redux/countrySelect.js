import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    value: {
      code: "US",
      currency: "USD",
      label: "United States",
      rate: 1,
      symbol: "$",
    },
  },
  reducers: {
    countrySelector: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { countrySelector } = countrySlice.actions;
export default countrySlice.reducer;
