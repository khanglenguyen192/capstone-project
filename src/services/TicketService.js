import axios from "axios";
import { BASE_URL } from "../common/constants/ApiConstants";
import fileDownload from "js-file-download";

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

const downloadFile = (fileName, savedFileName, token) => {
  return axios
    .get(TICKERT_URL + "/download-file", {
      params: { fileName: fileName },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      fileDownload(res.data, savedFileName);
    });
};

const createReport = (formData, token) => {
  return axios.post(TICKERT_URL + "/create-report", formData, {
    headers: {
      "Content-Type": `multipart/form-data;`,
      Authorization: `Bearer ${token}`,
    },
  });
};

const getReports = (ticketId, token) => {
  return axios.get(TICKERT_URL + "/get-reports", {
    params: { ticketId: ticketId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getReport = (reportId, token) => {
  return axios.get(TICKERT_URL + "/get-report", {
    params: { reportId: reportId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createTicket,
  searchTicket,
  getTicket,
  downloadFile,
  createReport,
  getReports,
  getReport,
};
