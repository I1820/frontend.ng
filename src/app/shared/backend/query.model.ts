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
