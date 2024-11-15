import React from "react";
import { DateTime } from "luxon";

interface Props {
  temp: number;
  hour: string;
  index: number;
  date: string;
}

export const WeatherItem: React.FC<Props> = ({ temp, hour, index, date }) => {
  const formattedHour = DateTime.fromISO(hour).toFormat("HH:mm");

  return (
    <li className="text-2xl">
      <p>
        {`${temp} °C`}
        <br />
        at
        <br />
        {formattedHour}
      </p>
      <p className="text-red-600">{index % 4 === 0 && ` ${date}`}</p>
    </li>
  );
};
