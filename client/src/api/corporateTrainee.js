import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/corporateTrainee",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const requestAccess = async (courseId, corporateTraineeId) =>
  await API.post(
    `/requestAccess?courseId=${courseId}&corporateTraineeId=${corporateTraineeId}`
  );

export const getCorporateTrainee = async () => {
  try {
    const { data } = await API.get("/getCorporateTrainee");
    return data;
  } catch (error) {
    return error;
  }
};

export const getMyCourses = async () => {
  try {
    const res = await API.get("/getMyCourses");
    return res;
  } catch (error) {
    return error;
  }
};
export const getGrade = async (exerciseId) => {
  try {
    const res = await API.get(`/getGrade?exerciseId=${exerciseId}`);
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
export const addExercise = async (exerciseId, grade) => {
  try {
    const res = await API.post(
      `/addExercise?exerciseId=${exerciseId}&grade=${grade}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const addVideoWatched = async (videoId) =>
  //put the attributes in the body
  {
    try {
      const res = await API.post(`/addVideoWatched`, { videoId });
      return res;
    } catch (error) {
      return error;
    }
  };

export const getProgress = async (courseId) => {
  try {
    const res = await API.get("/getProgress?courseId=" + courseId);
    return res;
  } catch (error) {
    return error;
  }
};

export const pushNotes = async (videoId, notes) => {
  try {
    const res = await API.post(`/pushNotes`, { videoId, notes });
    return res;
  } catch (error) {
    return error;
  }
};

export const getNotes = async (videoId) => {
  try {
    const res = await API.get(`/getNotes?videoId=${videoId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const addRatingCorporateTrainee = async (rating) => {
  const res = await API.post(`/addRatingCorporateTrainee`, rating);
  return res;
};
