import axios from "../config/axios";

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = (file, token) => {
  const data = new FormData();
  data.append("file", file);
  return axios.post("/upload", data, {
    headers: {
      // eslint-disable-next-line prefer-template
      Authorization: "Bearer " + token,
    },
  });
};
