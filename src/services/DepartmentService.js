import axios from "axios";
import { API_BASE_URL } from "../common/constants/ApiConstants";

const DEPARTMENT_URL = API_BASE_URL + "/department";

const createDepartment = (formData, token) => {
  return axios.post(DEPARTMENT_URL + "/create-department", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDepartmentsForEmployee = (employeeId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-for-employee", {
    params: { employeeId: employeeId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getRootDepartments = (token) => {
  return axios.get(DEPARTMENT_URL + "/get-root-deparments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDepartmentEmployees = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-department-users", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDepartmentManagers = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-department-managers", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getChildren = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-children", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUsersToAdd = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-users-to-add", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addUsersToDepartment = (body, token) => {
  return axios.post(DEPARTMENT_URL + "/add-department-users", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAccess = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-access", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = (body, token) => {
  return axios.post(DEPARTMENT_URL + "/update-user", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeUser = (body, token) => {
  return axios.post(DEPARTMENT_URL + "/remove-user", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDepartment = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-department", {
    params: { departmentId: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createDepartment,
  getDepartmentsForEmployee,
  getDepartmentEmployees,
  getDepartmentManagers,
  getChildren,
  getRootDepartments,
  getUsersToAdd,
  addUsersToDepartment,
  getAccess,
  updateUser,
  getDepartment,
  removeUser,
};
