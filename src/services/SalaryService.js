import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const SALARY_URL = API_BASE_URL + "/salary";

const getSalary = (userId, token) => {
  return axios.get(SALARY_URL + "/get-by-user", {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { getSalary };
