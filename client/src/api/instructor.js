import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/instructor" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getInstructor = async (id) => {
  try {
    const { data } = await API.get(`/getInstructor?id=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const createCourse = async (course) => {
  try {
    const { data } = await API.post("/createCourse", course);
    return data;
  } catch (error) {
    return error;
  }
};

export const definePromotion = async (
  courseId,
  discount,
  startDate,
  endDate
) => {
  try {
    const { data } = await API.patch(
      `/definePromotion?courseId=${courseId}&discount=${discount}&startDate=${startDate}&endDate=${endDate}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addRating = async (rating, review, instructorId, userId) => {
  try {
    const { data } = await API.post(
      `/addRating?rating=${rating}&review=${review}&instructorId=${instructorId}&userId=${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getInstructorCoursesFiltered = async ({
  price,
  rating,
  subject,
  search,
}) => {
  try {
    const { data } = await API.get(
      `/getInstructorCoursesFiltered?price=${price}&rating=${rating}&subject=${subject}&search=${search}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getRatingsAndReviews = async (id) => {
  try {
    const { data } = await API.get(`/getRatingsAndReviews?instructorId=${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getInstructorNoID = async () => {
  try {
    const { data } = await API.get("/getInstructorNoID");
    return data;
  } catch (error) {
    return error;
  }
};

export const editInstructorProfile = async (instructor) => {
  await API.patch("/editInstructorProfile", instructor);
};
