import React from "react";
import { WeatherItem } from "./WeatherItem";
import { DateTime } from "luxon";
import { WeatherResult } from "../../types/weather";

interface Props {
  visibleResult: WeatherResult[];
}

export const WeatherList: React.FC<Props> = ({ visibleResult }) => {
  return (
    <ul className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 w-full">
      {visibleResult &&
        visibleResult.map((item, index) => {
          const date = DateTime.fromISO(item[0] as string).toFormat("dd.MM");
          const time = (item[0] as string).split("T");
          const temp = +(+item[1]).toFixed(1);
          const hour = time[1];

          return (
            <WeatherItem
              index={index}
              temp={temp}
              hour={hour}
              date={date}
              key={date + index}
            />
          );
        })}
    </ul>
  );
};
