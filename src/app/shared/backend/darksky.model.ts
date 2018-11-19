export class DarkskyForecast {
  public time: Date;
  public summary: string;

  public temperatureLow: number;
  public temperatureLowTime: Date;
  public temperatureHigh: number;
  public temperatureHighTime: Date;

  public humidity: number;

  public windSpeed: number;
  public windBearing: number;

  constructor (input: any) {
    this.time = new Date(input.time * 1000);
    this.summary = input.summary;
    this.temperatureLow = input.temperatureLow;
    this.temperatureLowTime = new Date(input.temperatureLowTime * 1000);
    this.temperatureHigh = input.temperatureHigh;
    this.temperatureHighTime = new Date(input.temperatureHighTime * 1000);
    this.windSpeed = input.windSpeed;
    this.windBearing = input.windBearing;
    this.humidity = input.humidity;
  }
}

export class Darksky {
  public timezone: string;
  public latitude: number;
  public longitude: number;
  public daily: Array<DarkskyForecast> = [];

  constructor (input: any) {
    this.timezone = input.timezone;
    this.latitude = input.latitude;
    this.longitude = input.longitude;

    for (const forecast of input.daily.data) {
      this.daily.push(new DarkskyForecast(forecast));
    }
  }
}
