import { instance as axios } from "./axios";

export const registerRequest = async (user) =>
  axios.post("/auth/register", user, { withCredentials: true });

export const loginRequest = async (user) =>
  axios.post("/auth/login", user, { withCredentials: true });
