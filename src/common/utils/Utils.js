const getDepartmentRoleString = (roleId) => {
  switch (roleId) {
    case 1:
      return "Administrator";
    case 2:
      return "Manager";
    case 3:
    default:
      return "Member";
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

export default {
  getDepartmentRoleString,
  getFileSizeFromBytes,
};
