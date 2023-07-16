import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/admin" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createUser = async (user) => {
  try {
    const { data } = await API.post("/createUser", user);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getRequestCourses = async () => {
  try {
    const { data } = await API.get("/getRequestCourses");
    return data;
  } catch (error) {
    return error;
  }
};

export const acceptRequest = async (
  courseId,
  corporateTraineeId,
  requestCourseId
) => {
  try {
    const { data } = await API.post(
      `/grantCourseAccess/?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}&requestCourseId=${requestCourseId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const rejectRequest = async (requestCourseId) => {
  try {
    const { data } = await API.delete(
      `/rejectCourseAccess/?requestCourseId=${requestCourseId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getReportedProblems = async () => {
  try {
    const { data } = await API.get("/getReportedProblems");
    return data;
  } catch (error) {
    return error;
  }
};

export const updateProblemStatus = async (problemId, status) => {
  try {
    const { data } = await API.patch(
      `/updateProblemStatus/?problemId=${problemId}&status=${status}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getRefundRequests = async () => {
  try {
    const { data } = await API.get("/getRefundRequests");
    return data;
  } catch (error) {
    return error;
  }
};

export const acceptRefundRequest = async (
  refundId,
  courseId,
  individualTraineeId,
  instructorId
) => {
  try {
    const { data } = await API.patch(
      `/acceptRefundRequest/?refundId=${refundId}&courseId=${courseId}&individualTraineeId=${individualTraineeId}&instructorId=${instructorId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const rejectRefundRequest = async (refundId) => {
  try {
    const { data } = await API.delete(
      `/rejectRefundRequest/?refundId=${refundId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const definePromotions = async (
  courses,
  discount,
  startDate,
  endDate
) => {
  try {
    const { data } = await API.patch(
      `/definePromotions/?courses=${courses}&discount=${discount}&startDate=${startDate}&endDate=${endDate}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
