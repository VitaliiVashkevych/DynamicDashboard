import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeTopic } from "../../store/features/newsSlice";
import { useEffect, useRef } from "react";
import { Topics } from "../../types/news";

export const NewsTopics = () => {
  const dispatch = useAppDispatch();
  const { topic } = useAppSelector((state) => state.news);
  const prevTopic = useRef(Topics.worldNews);

  useEffect(() => {
    if (prevTopic.current !== topic) {
      prevTopic.current = topic;
    }
  }, [topic]);

  return (
    <ul className="flex w-full" style={{ justifyContent: "space-evenly" }}>
      {Object.values(Topics).map((currentTopic: Topics) => {
        const handleClick = () => {
          dispatch(changeTopic(currentTopic));
        };
        return (
          <li key={currentTopic} className="w-full">
            <button
              onClick={handleClick}
              className="mr-3 rounded border border-zinc-950 bg-slate-200 mt-3 hover:bg-slate-300 w-full"
              disabled={currentTopic === topic}
              style={{
                backgroundColor:
                  currentTopic === topic ? "rgb(148 163 184)" : "",
              }}
            >
              {currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
