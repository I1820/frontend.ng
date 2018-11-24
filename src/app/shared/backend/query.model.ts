export class State {
  public value: any;
  public at: Date;
  public pid: string;
  public tid: string;
  public asset: string;

  constructor(input: any) {
    this.value = input.raw;
    this.at = new Date(input.at);
    this.pid = input.project;
    this.tid = input.thing_id;
    this.asset = input.asset;
  }
}

export class Partial {
  public count: number;
  public value: number;
  public since: Date;
  public until: Date;

  constructor(input: any) {
    this.value = input.data;
    this.since = new Date(input.since);
    this.until = new Date(input.until);
  }
}
