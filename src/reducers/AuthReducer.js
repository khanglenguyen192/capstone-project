const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      isLoggedIn: true,
      isAdmin: user.role == "Administrator" || user.role == "Manager",
      user: user,
    }
  : { isLoggedIn: false, isAdmin: false, user: null };

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(payload.user));
      var isAdmin = false;
      if (
        payload.user.role == "Administrator" ||
        payload.user.role == "Manager"
      )
        isAdmin = true;
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: isAdmin,
        user: payload.user,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
      };
    default:
      return state;
  }
}
