export type WeatherResult = {
  [index: number]: string | number;
};
export interface WeatherParams {
  latitude: number;
  longitude: number;
  hourly: string;
  forecast_days: number;
}