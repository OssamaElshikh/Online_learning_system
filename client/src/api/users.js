import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/users",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const reportProblem = async (courseId, userId, problem, problemType) =>
  await API.post(
    `/reportProblem?courseId=${courseId}&userId=${userId}&problem=${problem}&problemType=${problemType}`
  );

export const resetPasswordMail = async (email) =>
  await API.post(`/resetPasswordMail?email=${email}`);

export const changePassword = async (password, confirmPassword, userId) => {
  await API.patch(
    `/changePassword?password=${password}&confirmPassword=${confirmPassword}&userId=${userId}`
  );
};

export const getUserReportedProblems = async (userId) => {
  return await API.get(`report/?id=${userId}`);
};

export const followUp = async (problemId, message) => {
  await API.patch(`/followUp?id=${problemId}&message=${message}`);
};

export const getResolvedUserProblems = async (userId) => {
  return await API.get(`/resolved?id=${userId}`);
};
