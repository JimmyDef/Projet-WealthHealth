import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { employeesSlice, formSlice } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const employeesConfig = {
  key: "employees",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  employeesConfig,
  employeesSlice.reducer
);

export const store = configureStore({
  reducer: {
    employees: persistedReducer,
    form: formSlice.reducer,
  },
});
export const persistor = persistStore(store);
