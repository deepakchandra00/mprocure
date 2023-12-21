import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createBuyPlan from "./createBuy/createbuyplan.reducer";
import getBuyList from './buyinglist/buyinglist.reducer';
import getUser from './user/user.reducer';
import eventReducer from './event/Event.reducers';
import getRefineList from './refinelist/refinelist.reducer';

const rootReducer = combineReducers({
  createBuyPlanAPI: createBuyPlan,
  getBuyList: getBuyList,
  getUser: getUser,
  eventReducer: eventReducer,
  getRefineList: getRefineList
  // filter: getFilterReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
  middleware: middlewareList,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);
