import { instance as axios } from "./axios";

export const uploadImageRequest = async (imageData) =>
  axios.post("/client/set-avatar", imageData, { withCredentials: true });

// export const getAvatarRequest = async () =>
//   axios.get("/client/get-avatar", { withCredentials: true });

export const getAllContacts = async (id) =>
  axios.get(`/client/all-contacts/${id}`, { withCredentials: true });
