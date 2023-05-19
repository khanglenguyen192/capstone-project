import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const TICKERT_URL = API_BASE_URL + "/ticket";

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

function downloadFile(fileName, savedFileName, token) {
  return axios
    .get(TICKERT_URL + "/download-file", {
      params: { fileName: fileName },
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const blob = new Blob([res.data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = savedFileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Cleanup
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });
}

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
