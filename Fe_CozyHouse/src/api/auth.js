import axios from "../config/axios";

export const login = (username, password) =>
  axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => res.data);

export const register = (username, password, bio, education) =>
  axios
    .post("/auth/register", {
      username,
      password,
      bio,
      education,
    })
    .then((res) => res.data);
