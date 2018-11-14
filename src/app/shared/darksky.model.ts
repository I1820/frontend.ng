export class DarkskyForecast {
  public time: Date;
  public summary: string;

  public temperatureMin: number;
  public temperatureMinTime: Date;
  public temperatureMax: number;
  public temperatureMaxTime: Date;

  constructor (input: any) {
    this.time = new Date(input.time * 1000);
    this.summary = input.summary;
    this.temperatureMin = input.temperatureMin;
    this.temperatureMinTime = new Date(input.temperatureMinTime * 1000);
    this.temperatureMax = input.temperatureMax;
    this.temperatureMaxTime = new Date(input.temperatureMaxTime * 1000);
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
