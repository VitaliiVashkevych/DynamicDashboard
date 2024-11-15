import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NewsTopics } from "./NewsTopics";
import { NewsVirtualiser } from "./Virtualiser";
import { getNews } from "../../store/features/thunks/getNews";

export const News = () => {
  const dispatch = useAppDispatch();
  const { nextPage, topic } = useAppSelector((state) => state.news);

  const url = `https://fakenews.squirro.com/news/${topic}?since=${nextPage}&count=50`;

  useEffect(() => {
    dispatch(getNews(url));
  }, [topic]);


  return (
    <section className="flex flex-col items-center mt-3">
      <h2 className="text-red-600 text-2xl">News</h2>

      <NewsTopics />

      <NewsVirtualiser />
    </section>
  );
};
