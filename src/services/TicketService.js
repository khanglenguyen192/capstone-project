import axios from "axios";
import { BASE_URL } from "../common/constants/ApiConstants";

const TICKERT_URL = BASE_URL + "/ticket";

const createTicket = (formData, token) => {
  return axios.post(TICKERT_URL + "/create", formData, {
    headers: {
      "Content-Type": `multipart/form-data;`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createTicket,
};
