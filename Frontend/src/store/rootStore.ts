import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { employeeDataReducer } from "../slices/employeeDataSlice";
import { useDispatch } from "react-redux";

// Combine reducers (add your reducers here)
const rootReducer = combineReducers({ employeeData: employeeDataReducer });

// Configure the store
const rootStore = configureStore({
  reducer: rootReducer,
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

// Export the store
export { rootStore };
