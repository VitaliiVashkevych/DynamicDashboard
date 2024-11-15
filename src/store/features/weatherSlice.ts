import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTemperature } from "../../helpers/getTemperature";
import { WeatherResult } from "../../types/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  getTemperature
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: [] as WeatherResult[],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      });
  },
});

export default weatherSlice.reducer;
