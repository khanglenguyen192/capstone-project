import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";
import { specialDayType } from "../common/constants/Constants";

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

const getSpecialDays = (userId, type, token) => {
  return axios.get(DAYOFF_URL + "/get-dayoff-emp", {
    params: {
      userId: userId,
      type: specialDayType.find(x => x.type === type).value,
    },
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

const handleRequest = (data, token) => {
  return axios.put(DAYOFF_URL + "/handle-request", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default {
  createDayOff,
  getSpecialDays,
  deleteDayOff,
  searchDayOff,
  handleRequest,
};
