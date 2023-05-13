import Constants from "../constants/Constants";

let eventGuid = 0

export function createEventId() {
    return String(eventGuid++);
}

const getDepartmentRoleString = (roleId) => {
  switch (roleId) {
    case 1:
      return "Quản trị viên";
    case 2:
      return "Quản lý";
    case 3:
    default:
      return "Nhân viên";
  }
};

function getFileSizeFromBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getTicketStatusLabel(ticketStatus) {
  for (var i = 0; i < Constants.ticketStatusModels.length; i++) {
    if (ticketStatus == Constants.ticketStatusModels[i].value) {
      return Constants.ticketStatusModels[i].label;
    }
  }

  return "None";
}

function getGenderString(genderId) {
  var gender = Number(genderId);
  switch (gender) {
    case 1:
      return "Nam";
    case 2:
      return "Nữ";
    case 3:
      return "Khác";
  }
}

export default {
  getDepartmentRoleString,
  getFileSizeFromBytes,
  getTicketStatusLabel,
  getGenderString,
};
