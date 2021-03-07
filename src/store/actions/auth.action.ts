import axios from "../../config/axiosConfig";
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

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const registerUser = (
  email: string,
  username: string,
  password: string
) => async (dispatch: Function) => {
  dispatch({ type: REGISTER_USER_START });

  const formData = new FormData();
  formData.set("email", email);
  formData.set("username", username);
  formData.set("password", password);

  await axios
    .post("/users/register", formData)
    .then((res) => {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_USER_FAIL });
      console.log(err);
    });
};

export const loginUser = (username: string, password: string) => async (
  dispatch
) => {
  dispatch({ type: LOGIN_USER_START });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  await axios
    .post("/users/login", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAIL });
      console.log(err);
    });
};

export const loadUser = () => async (dispatch, getState) => {
  await axios
    .get("/users", tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({ type: LOAD_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getWallets = () => async (dispatch, getState) => {
  await axios
    .get("/users/wallet", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_USER_WALLETS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
