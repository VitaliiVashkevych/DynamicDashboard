import { fetchWeatherApi } from "openmeteo";
import { URL } from "../constants/weatherUrl";
import { WeatherParams } from "../types/weather";

export async function getTemperature(params: WeatherParams) {
  const responses = await fetchWeatherApi(URL, params);
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly()!;
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };
  const result = [] as [string, number][];
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    result.push([
      weatherData.hourly.time[i].toISOString().replace("Z", ""),
      weatherData.hourly.temperature2m[i],
    ]);
  }

  return result;
}
