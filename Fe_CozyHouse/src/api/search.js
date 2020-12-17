import axios from "../config/axios";

export const loadData = (title) =>
  axios
    .post("setCard/search", {
        title
    })
    .then((res) => res.data);

