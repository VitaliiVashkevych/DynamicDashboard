import { createSlice } from "@reduxjs/toolkit";
import { NewsState, NewsType, Topics } from "../../types/news";
import { getNews } from "./thunks/getNews";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [] as NewsType[],
    isLoading: true,
    nextPage: 0,
    eof: false,
    topic: Topics.worldNews,
  } as NewsState,
  reducers: {
    changeTopic: (state, action) => {
      state.topic = action.payload;
      state.news = [];
      state.eof = false;
      state.nextPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eof = action.payload.eof;
        state.news = [...state.news, ...action.payload.news];
        state.nextPage = action.payload.next;
      });
  },
});

export const { changeTopic } = newsSlice.actions;
export default newsSlice.reducer;
