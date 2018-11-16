export class Asset {
  constructor(
    public name: string, // e.g. 100
    public title: string, // e.g. temperature
    public kind: string, // e.g. number
    public type: string, // sensor
  ) {
  }
}

export class Connectivity {
}

export class Thing {
  public name: string;
  public id: string;
  public model: string;
  public latitude: number;
  public longitude: number;
  public assets: Array<Asset> = [];
  public tokens: Array<string> = [];

  constructor(input: any) {
    this.name = input.name;
    this.id = input.id;
    this.model = input.model;
    this.latitude = input.location.coordinates[1];
    this.longitude = input.location.coordinates[0];

    for (let name in input.assets) {
      this.assets.push();
    }

    for (let token of input.tokens) {
      this.tokens.push(token);
    }
  }

}
