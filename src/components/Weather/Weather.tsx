import { useEffect, useState } from "react";
import { WeatherTitle } from "./WeatherTitle";
import { WeatherCitySelector } from "./WeatherCityCelector";
import { WeatherSubtitle } from "./WeatherSubtitle";
import { WeatherToggle } from "./WeatherToggle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchWeather } from "../../store/features/weatherSlice";
import { WeatherList } from "./WeatherList";
import React from "react";
import { WeatherResult } from "../../types/weather";

export const Weather = () => {
  const dispatch = useAppDispatch();

  const [city, setCity] = useState("Chernivtsi");
  const [visibleResult, setVisibleResult] = useState<WeatherResult[]>();
  const [isToday, setIsToday] = useState(true);

  const { weather } = useAppSelector((state) => state.weather);

  const [findCity, setFindCity] = useState("");
  const [params, setParams] = useState({
    latitude: 48.29,
    longitude: 25.94,
    hourly: "temperature_2m",
    forecast_days: 7,
  });
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${findCity}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`;
  async function getLoc(url: string) {
    const res = await fetch(url);
    const data = await res.json();

    const lat = data.results[0].geometry.lat;
    const lng = data.results[0].geometry.lng;
    setParams({
      ...params,
      latitude: lat,
      longitude: lng,
    });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const elements = target.elements as HTMLFormControlsCollection;

    setCity((elements[0] as HTMLInputElement).value);

    getLoc(url);
  };

  useEffect(() => {
    const promise = dispatch(fetchWeather(params));

    promise.unwrap().then((res) => {
      setVisibleResult(res.filter((_, index) => index % 6 === 0).slice(0, 4));
    });

    return () => {
      promise.abort();
    };
  }, [params]);

  const handleShowMore = () => {
    if (isToday) {
      setVisibleResult(weather.filter((_, index) => index % 6 === 0));
    } else {
      setVisibleResult(
        weather.filter((_, index) => index % 6 === 0).slice(0, 4)
      );
    }

    setIsToday(!isToday);
  };

  return (
    <section className="text-center flex flex-col items-center">
      <WeatherTitle
        city={city}
        result={weather}
        lat={params.latitude}
        lng={params.longitude}
      />

      <WeatherCitySelector
        handleSubmit={handleSubmit}
        setFindCity={setFindCity}
        setParams={setParams}
        params={params}
        setCity={setCity}
      />

      <WeatherSubtitle isToday={isToday} />

      <WeatherList visibleResult={visibleResult as WeatherResult[]} />

      <WeatherToggle handleShowMore={handleShowMore} isToday={isToday} />
    </section>
  );
};
