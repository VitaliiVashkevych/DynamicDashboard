import { useState } from "react";
import { PossibleCitites } from "./PossibleCities";
import React from "react";
import { WeatherParams } from "../../types/weather";

interface Props {
  handleSubmit: (e: React.SyntheticEvent) => void;
  setFindCity: (value: string) => void;
  setParams: (params: WeatherParams) => void;
  params: WeatherParams;
  setCity: (city: string) => void;
}

export const WeatherCitySelector: React.FC<Props> = ({
  handleSubmit,
  setFindCity,
  setParams,
  params,
  setCity,
}) => {
  const [possibleCities, setPossibleCities] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const getPossibleCities = async (requestedCity: string) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${requestedCity}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`;

    const res = await fetch(url);
    const data = await res.json();

    const result = data.results.map(
      (city: { formatted: string; geometry: { lat: number; lng: number } }) => {
        return [city.formatted, city.geometry];
      }
    );

    setPossibleCities(result);
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
          setIsVisible(false);
        }}
      >
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="cityInput"
          placeholder="Find city"
          onChange={(e) => {
            setFindCity(e.target.value);
            getPossibleCities(e.target.value);
            setIsVisible(true);
          }}
        />

        <PossibleCitites
          possibleCities={possibleCities}
          setParams={setParams}
          params={params}
          setCity={setCity}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </form>
    </>
  );
};
