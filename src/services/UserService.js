import axios from "axios";
import { BASE_URL } from "../common/constants/ApiConstants";

const USER_URL = BASE_URL + "/users";

const getUser = (userId, token) => {
  return axios.get(USER_URL + "/get-user", {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getUser,
};
