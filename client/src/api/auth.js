import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/users" });

export const signin = async (formData) => {
  try {
    const { data } = await API.post("/signin", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData) => {
  try {
    const { data } = await API.post("/signup", formData);
    console.log("data in api", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
