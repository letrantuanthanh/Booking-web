import { createStore } from "redux";

const initialState = { isLogin: false, user: {}, hotels: [], searchItems: [] };

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

  if (action.type === "SET_HOTELS") {
    return {
      ...state,
      hotels: action.hotels,
    };
  }

  if (action.type === "SET_SEARCH_ITEMS") {
    return {
      ...state,
      searchItems: action.searchItems,
    };
  }
  return state;
};

const store = createStore(indexReducer);

export default store;
