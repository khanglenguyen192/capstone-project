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

export default {
  getDepartmentRoleString,
};
