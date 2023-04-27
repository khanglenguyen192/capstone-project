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

const searchTicket = (body, token) => {
  return axios.post(TICKERT_URL + "/search", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTicket = (ticketId, token) => {
  return axios.get(TICKERT_URL + "/get-ticket", {
    params: { ticketId: ticketId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createTicket,
  searchTicket,
  getTicket,
};
