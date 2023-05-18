import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
