import React from "react";
import { DateTime } from "luxon";
import { WeatherResult } from "../../types/weather";

interface Props {
  city: string;
  result: WeatherResult[];
  lat: number;
  lng: number;
}

export const WeatherTitle: React.FC<Props> = ({ city, result, lat, lng }) => {
  const date =
    result.length > 0
      ? DateTime.fromISO(result[0][0] as string).toFormat("dd.MM.yy")
      : "";

  return (
    <>
      {date && (
        <h2 className="text-cyan-600 text-2xl">
          <p>
            Temperature in {city}, {date}
          </p>
          <p>
            Coords: Latitude: {lat.toFixed(2)} Longitude: {lng.toFixed(2)}
          </p>
        </h2>
      )}
    </>
  );
};
