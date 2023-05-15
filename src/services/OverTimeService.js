import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const OVERTIME_URL = API_BASE_URL + "/overtime";

const createOverTime = (body, token) => {
  return axios.post(OVERTIME_URL + "/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createOverTime,
};
