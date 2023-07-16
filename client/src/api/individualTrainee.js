import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/individualTrainee",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getTrainee = async () => {
  try {
    const { data } = await API.get("/getTrainee");
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
export const payForCourse = async (courseId, traineeId, instructorId) =>
  await API.post(
    `/payForCourse?courseId=${courseId}&traineeId=${traineeId}&instructorId=${instructorId}`
  );

export const requestRefund = async (
  courseId,
  individualTraineeId,
  instructorId
) =>
  await API.post(
    `/requestRefund?courseId=${courseId}&individualTraineeId=${individualTraineeId}&instructorId=${instructorId}`
  );

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

export const addRatingIndividualTrainee = async (rating) => {
  const res = await API.post(`/addRatingIndividualTrainee`, rating);
  return res;
};
