import React from "react";

interface Props {
  isToday: boolean;
}

export const WeatherSubtitle: React.FC<Props> = ({ isToday }) => {
  return (
    <h3 className="text-red-600 text-2xl">
      {isToday ? "Today" : "Next 7 days"}
    </h3>
  );
};
