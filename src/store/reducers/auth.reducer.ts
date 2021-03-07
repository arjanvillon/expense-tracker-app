import {
  GET_USER_WALLETS,
  LOAD_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  loading: false,
  authenticated: false,
  token: localStorage.getItem("token"),
  user: null,
  wallets: [],
};

export default function auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER_START:
    case REGISTER_USER_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        authenticated: true,
      };
    case LOAD_USER:
      return {
        ...state,
        ...payload,
        loading: false,
        authenticated: true,
      };
    case GET_USER_WALLETS:
      return {
        ...state,
        wallets: payload,
      };
    default:
      return state;
  }
}
