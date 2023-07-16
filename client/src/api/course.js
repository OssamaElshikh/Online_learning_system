import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/course" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getCountryInfo = async () =>
  await axios
    .get(
      "https://v6.exchangerate-api.com/v6/7c56b85d290b93164fdf9b62/latest/USD"
    )
    .then((res) => res.data.conversion_rates);
export const getCourses = async () => await API.get("/");

export const getCoursesFiltered = async ({ price, rating, subject, search }) =>
  await API.get(
    `/filter/?price=${price}&rating=${rating}&subject=${subject}&search=${search}`
  );

export const getCourse = async (id) => await API.get(`course/?id=${id}`);

export const getInstructorCourses = async () => await API.get("/instructor");

export const getPopularCourses = async () => await API.get("/popularCourses");

export const enrollTrainee = async (courseId, traineeId, instructorId, price) =>
  await API.get(
    `/enroll?courseId=${courseId}&traineeId=${traineeId}&instructorId=${instructorId}&price=${price}`
  );

export const refundCourse = async (courseId, traineeId, price) =>
  await API.get(`/refund?courseId=${courseId}&traineeId=${traineeId}`);

export const getRatingsAndReviews = async (courseId) => {
  return await API.get(`/ratingsAndReviews?courseId=${courseId}`);
};
