import axios from "../config/axios";

export const login = (username, password) =>
  axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => res.data);

export const register = (username, CMND, address, phone,email, password) =>
  axios
    .post("/auth/register", {
      username,
      CMND,
      address,
      phone,
      email,
      password
    })
    .then((res) => res.data);