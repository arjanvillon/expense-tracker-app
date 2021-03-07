import {
  ADD_TRANSACTION_FAIL,
  ADD_TRANSACTION_START,
  ADD_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  loading: false,
  transactions: [],
  transaction: null,
};

export default function auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TRANSACTION_START:
    case GET_TRANSACTIONS_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_TRANSACTION_FAIL:
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload,
        loading: false,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    default:
      return state;
  }
}
