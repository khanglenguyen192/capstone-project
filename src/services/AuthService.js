import axios from "axios";
import { BASE_URL } from "../common/constants/ApiConstants";

const login = (username, password) => {
  const body = {
    userName: username,
    passCode: password,
  };

  return axios.post(BASE_URL + "/home/login", body);
};

export default {
  login,
};
