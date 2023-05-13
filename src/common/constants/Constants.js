import COLORS from "./Colors";

const ticketStatusModels = [
  {
    value: 0,
    label: "Open",
  },
  {
    value: 1,
    label: "In Progress",
  },
  {
    value: 2,
    label: "In Review",
  },
  {
    value: 3,
    label: "Done",
  },
  {
    value: 4,
    label: "Pending",
  },
];

const genders = [
  {
    value: 1,
    label: "Nam",
    id: 1,
  },
  {
    value: 2,
    label: "Nữ",
    id: 2,
  },
  {
    value: 3,
    label: "Khác",
    id: 3,
  },
];

const roles = [
  {
    value: 2,
    label: "Quản lý",
    id: 2,
  },
  {
    value: 3,
    label: "Nhân viên",
    id: 3,
  },
];

const salaryTypes = [
  {
    value: 1,
    label: "Net",
    id: 1,
  },
  {
    value: 2,
    label: "Gross",
    id: 2,
  },
];

const userMenu = [
  {
    icon: "fi-air-play",
    routerLink: "/home",
    title: "Trang chủ",
  },
  ,
  {
    icon: "mdi mdi-account-multiple menu-icon",
    routerLink: "/add-user",
    title: "Thêm nhân viên",
  },
  {
    icon: "mdi mdi-note-multiple-outline menu-icon",
    routerLink: "/projects",
    title: "Dự án",
  },
  {
    icon: "mdi mdi-sitemap menu-icon",
    routerLink: "/departments",
    title: "Phòng ban",
  },
  {
    icon: "mdi mdi-message-video menu-icon",
    routerLink: "/meeting",
    title: "Hội họp",
  },
  {
    icon: "mdi mdi-calendar-today menu-icon",
    routerLink: "/day-off",
    title: "Ngày nghỉ",
  },
  {
    icon: "mdi mdi-account-network menu-icon",
    routerLink: "/work-remote",
    title: "Làm việc từ xa",
  },
  {
    icon: "mdi mdi-av-timer menu-icon",
    routerLink: "/overtime",
    title: "Tăng ca",
  },
  {
    icon: "mdi mdi-cash-multiple menu-icon",
    routerLink: "/advanced-salary",
    title: "Ứng lương",
  },
  {
    icon: "mdi mdi-file-document-box menu-icon",
    routerLink: "/salary-detail",
    title: "Bảng lương",
  },
];

const rootMenu = [
  {
    icon: "fi-air-play",
    routerLink: "/home",
    title: "Trang chủ",
  },
  {
    icon: "mdi mdi-note-text menu-icon",
    routerLink: "/tickets",
    title: "Công việc",
  },
  {
    icon: "mdi mdi-account-multiple menu-icon",
    routerLink: "/add-user",
    title: "Thêm nhân viên",
  },
  {
    icon: "mdi mdi-note-multiple-outline menu-icon",
    routerLink: "/projects",
    title: "Dự án",
  },
  {
    icon: "mdi mdi-sitemap menu-icon",
    routerLink: "/departments",
    title: "Phòng ban",
  },
  {
    icon: "mdi mdi-message-video menu-icon",
    routerLink: "/meeting",
    title: "Hội họp",
  },
  {
    icon: "mdi mdi-calendar-today menu-icon",
    routerLink: "/day-off",
    title: "Ngày nghỉ",
  },
  {
    icon: "mdi mdi-account-network menu-icon",
    routerLink: "/work-remote",
    title: "Làm việc từ xa",
  },
  {
    icon: "mdi mdi-av-timer menu-icon",
    routerLink: "/overtime",
    title: "Tăng ca",
  },
  {
    icon: "mdi mdi-cash-multiple menu-icon",
    routerLink: "/advanced-salary",
    title: "Ứng lương",
  },
  {
    icon: "mdi mdi-file-document-box menu-icon",
    routerLink: "/salary-detail",
    title: "Bảng lương",
  },
];

export default {
  ticketStatusModels,
  genders,
  roles,
  salaryTypes,
  userMenu,
  rootMenu,
};

const typeDayOff = [
  {
    type: "NG",
    option: 1,
    bgColor: COLORS.blue_purple,
  },
  {
    type: "SA",
    option: 2,
    bgColor: COLORS.quite_blue,
  },
  {
    type: "CH",
    option: 3,
    bgColor: COLORS.quite_orange,
  },
];

const specialDayType = [
  {
    type: "None",
    value: 0,
  },
  {
    type: "DayOff",
    value: 1,
  },
  {
    type: "Holiday",
    value: 2,
  },
  {
    type: "MakeUp",
    value: 3,
  },
  {
    type: "Weekend",
    value: 4,
  },
  {
    type: "Remote",
    value: 5,
  },
];

const dayOffStatus = [
  {
    status: "Đã chấp nhận",
    value: 1,
  },
  {
    status: "Chờ xét duyệt",
    value: 2,
  },
  {
    status: "Từ chối",
    value: 3,
  },
];

export { typeDayOff, specialDayType, dayOffStatus };
