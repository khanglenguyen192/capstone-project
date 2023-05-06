import axios from "axios";
import { BASE_URL } from "../common/constants/ApiConstants";

const DEPARTMENT_URL = BASE_URL + "/department";

const createDepartment = (body, token) => {
  return axios.post(DEPARTMENT_URL + "/create-department", body, {
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

const getDepartmentEmployees = (departmentId, token) => {
  return axios.get(DEPARTMENT_URL + "/get-department-users", {
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

export default {
  createDepartment,
  getDepartmentsForEmployee,
  getDepartmentEmployees,
  getChildren,
};
