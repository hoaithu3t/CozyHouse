import axios from "../config/axios";

export const createSetCard = (token, data) =>
  axios
    .post("/setCard", data, {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);

export const updateSetCard = (token, createPostPayload) =>
  axios
    .put("/setCard", createPostPayload, {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);

// Cái này a vừa thêm vào
export const deleteSetCard = (token, payload) =>
  axios
    .delete("/setCard", payload, {
      headers: {
        // eslint-disable-next-line prefer-template
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);

export const getSetCard = (slug) =>
  axios
    .get(`/setCard/${slug}`, {
      // headers: {
      //   // eslint-disable-next-line prefer-template
      //   Authorization: "Bearer " + localStorage.getItem("jwt"),
      // },
    })
    .then((res) => res.data);

export const getAllSetCard = () =>
  axios
    .get(`/setCard`, {
      // headers: {
      //   // eslint-disable-next-line prefer-template
      //   Authorization: "Bearer " + localStorage.getItem("jwt"),
      // },
    })
    .then((res) => res.data);
