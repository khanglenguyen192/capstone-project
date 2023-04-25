const user = null;
const initialState = user
  ? { isLoggedIn: true, isAdmin: false, user }
  : { isLoggedIn: false, isAdmin: false, user: null };

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        isAdmin:
          payload.user.role === "Administrator" ||
          payload.user.role === "Manager",
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
