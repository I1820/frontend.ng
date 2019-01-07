export class Widget {
  constructor (
    public title: string,
    public type: string,
    public pid: string,
    public tid: string,
    public asset: string,
    public size: number,
    public params: any,
  ) {
  }
}

export class MapView {
  constructor (
    public latitude: number,
    public longitude: number,
    public zoom: number,
  ) {
  }
}
