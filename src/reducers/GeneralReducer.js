const initialState = { title: "" };

export default function GeneralReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "home":
      return {
        ...state,
        title: "Trang chủ",
      };
    case "add-user":
      return {
        ...state,
        title: "Thêm nhân viên",
      };
    case "user":
      return {
        ...state,
        title: "Thông tin nhân viên",
      };
    case "project":
      return {
        ...state,
        title: "Dự án",
      };
    case "department":
      return {
        ...state,
        title: "Phòng ban",
      };
    case "day-off":
      return {
        ...state,
        title: "Nghỉ phép",
      };
    case "work-remote":
      return {
        ...state,
        title: "Làm việc từ xa",
      };
    case "overtime":
      return {
        ...state,
        title: "Tăng ca",
      };
    case "meeting":
      return {
        ...state,
        title: "Hội họp",
      };
    case "advanced-salary":
      return {
        ...state,
        title: "Ứng lương",
      };
    case "salary":
      return {
        ...state,
        title: "Bảng lương",
      };
    case "ticket":
      return {
        ...state,
        title: "Công việc",
      };
    case "report":
      return {
        ...state,
        title: "Báo cáo công việc",
      };
    case "coming-soon":
      return {
        ...state,
        title: "",
      };
    default:
      return state;
  }
}
