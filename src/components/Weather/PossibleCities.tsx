import React from "react";
import { WeatherParams } from "../../types/weather";

type City = [string, { lat: number; lng: number }];

interface Props {
  possibleCities: City[];
  setParams: (params: WeatherParams) => void;
  params: WeatherParams;
  setCity: (city: string) => void;
  isVisible: boolean;
  setIsVisible: (input: boolean) => void;
}

export const PossibleCitites: React.FC<Props> = ({
  possibleCities,
  setParams,
  params,
  setCity,
  isVisible,
  setIsVisible,
}) => {
  return (
    <>
      {!!possibleCities.length && isVisible && (
        <ul className=" bg-zinc-200 w-[400px] absolute -translate-x-1/2 left-1/2 overflow-hidden z-10">
          {possibleCities.map((variant: City) => {
            const cityName = variant[0];
            const lat = variant[1].lat;
            const lng = variant[1].lng;
            const cityNameFormatted = cityName
              .split(",")[0]
              .replace(/[0-9]/g, "");

            const handleClick = () => {
              setParams({
                ...params,
                latitude: lat,
                longitude: lng,
              });
              setCity(cityNameFormatted);
              setIsVisible(false);
              const id = document.getElementById(
                "cityInput"
              ) as HTMLInputElement;
              id.value = cityNameFormatted;
            };
            return (
              <li
                onClick={() => handleClick()}
                key={cityName}
                className="p-1 hover:bg-zinc-300 cursor-pointer border border-zinc-400 border-b-1 "
              >
                {cityName}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
