import React from "react";
import { NewsType } from "../../types/news";

interface Props {
  item: NewsType;
}

export const NewsItem: React.FC<Props> = ({ item }) => {
  return (
    <a
      href={item?.article_uri}
      target="_blank"
      key={item?.id}
      rel="noreferrer noopen"
    >
      <h2 className="mt-3 bg-red-100 w-full text-center hover:bg-red-200">
        {item?.headline}
      </h2>
    </a>
  );
};
