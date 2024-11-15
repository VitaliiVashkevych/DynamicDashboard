import { useEffect, useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual";
import { NewsSkeleton } from "../NewsSkeleton/NewsSkeleton";
import { NewsItem } from "./NewsItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getNews } from "../../store/features/thunks/getNews";

export const NewsVirtualiser = () => {
  const dispatch = useAppDispatch();
  const { nextPage, isLoading, topic, news: visibleNews } = useAppSelector((state) => state.news);

  const url = `https://fakenews.squirro.com/news/${topic}?since=${nextPage}&count=50`;

  const parentRef = useRef(null);
  
  const rowVirtualiser = useVirtualizer({
    count: isLoading ? visibleNews.length + 50 : visibleNews.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 1
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualiser.getVirtualItems().reverse()];
    if (!lastItem) {
      return;
    }

    if (lastItem.index >= visibleNews.length - 1 && !isLoading) {
      dispatch(getNews(url))
    }
  }, [visibleNews.length, rowVirtualiser.getVirtualItems(), isLoading, nextPage, topic, url]);

  return (
    <div
      ref={parentRef}
      style={{
        height: '500px',
        width: '100%',
        overflow: 'auto'
      }}
      id="virtualiser"
    >
      <div
        style={{
          height: `${rowVirtualiser.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualiser.getVirtualItems().map((virtualRow) => {
          const showSkeleton = virtualRow.index > visibleNews.length - 1;
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {showSkeleton ? <NewsSkeleton /> : <NewsItem item={visibleNews[virtualRow.index]} />}
            </div>
          )
        })}
      </div>
      </div>
  )
}