import axios from "../config/axios";

export const me = (token) =>
  axios
    .get("/me", {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);

export const updateMe = (token, payload) =>
  axios
    .put("/me", payload, {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
