import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNews = createAsyncThunk(
  "news/fetchNews",
  async (url: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(url);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(null);
    }
  }
);
