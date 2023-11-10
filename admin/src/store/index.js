import { createStore } from "redux";

const initialState = { isLogin: false, user: {} };

const indexReducer = (state = initialState, action) => {
  if (action.type === "ON_LOGIN") {
    return {
      ...state,
      user: action.user,
      isLogin: true,
    };
  }

  if (action.type === "ON_LOGOUT") {
    return {
      ...state,
      user: {},
      isLogin: false,
    };
  }
  return state;
};

const store = createStore(indexReducer);

export default store;
