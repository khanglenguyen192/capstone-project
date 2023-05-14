import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const DAYOFF_URL = API_BASE_URL + "/specialday";

const createDayOff = (data, token) => {
  const request = {
    specialDays: data,
    // dateTime: data.dateTime,
    // reason: data.reason,
    // option: data.option,
    // isUrgent: data.isUrgent,
    // type: data.type, // 1 - Dayoff
    // userId: userId
  };

  return axios.post(DAYOFF_URL + "/create", request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDayOff = (userId, token) => {
  return axios.get(DAYOFF_URL + "/get-dayoff-emp", {
    params: { userId: userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteDayOff = (eventId, token) => {
  return axios.delete(DAYOFF_URL + "/delete", {
    params: { specialDayId: eventId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const searchDayOff = (body, token) => {
  return axios.post(DAYOFF_URL + "/search", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createDayOff,
  getDayOff,
  deleteDayOff,
  searchDayOff,
};
