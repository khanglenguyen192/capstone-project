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

const getOverTimeByUserId = (userId, token) => {
  return axios.get(OVERTIME_URL + "/get-by-user", {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteOverTime = (overTimeId, token) => {
  return axios.delete(OVERTIME_URL + "/delete", {
    params: { overTimeId: overTimeId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createOverTime,
  getOverTimeByUserId,
  deleteOverTime,
};
