import axios from "../../config/axiosConfig";
import {
  ADD_TRANSACTION_FAIL,
  ADD_TRANSACTION_START,
  ADD_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
} from "../types";
import { tokenConfig } from "./auth.action";
import dayjs from "dayjs";

export const getTransactions = () => async (dispatch, getState) => {
  dispatch({ type: GET_TRANSACTIONS_START });

  await axios
    .get("/transactions", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: GET_TRANSACTIONS_FAIL });
      console.log(err);
    });
};

export const addTransaction = (
  wallet: Number,
  amount: string,
  category: string,
  note: string,
  date: Date
) => async (dispatch, getState) => {
  dispatch({ type: ADD_TRANSACTION_START });

  const body = JSON.stringify({
    wallet,
    amount,
    category,
    note,
    date: dayjs(date).format("YYYY-MM-DD"),
  });

  await axios
    .post("/transactions/", body, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ADD_TRANSACTION_SUCCESS, payload: res.data });
    })
    .then((err) => {
      console.log(err);
      dispatch({ type: ADD_TRANSACTION_FAIL });
    });
};
