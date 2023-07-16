import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySelect";

export default configureStore({
  reducer: { country: countryReducer },
});
