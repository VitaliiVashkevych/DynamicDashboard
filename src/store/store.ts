import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice";
import weatherReducer from "./features/weatherSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    weather: weatherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;