import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const USER_URL = API_BASE_URL + "/users";

const getUser = (userId, token) => {
  return axios.get(USER_URL + "/get-user", {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createUser = (body, token) => {
  return axios.post(USER_URL + "/create-user", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = (userId, formData, token) => {
  return axios.post(USER_URL + "/update-user", formData, {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUserIdentity = (userId, formData, token) => {
  return axios.post(USER_URL + "/update-user-identity", formData, {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const changePassword = (currentPassword, newPassword, token) => {
  return axios.post(
    USER_URL + "/change-password",
    {
      currentPassword: currentPassword,
      newPassword: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  getUser,
  createUser,
  updateUser,
  updateUserIdentity,
  changePassword,
};
