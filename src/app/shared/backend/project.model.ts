export class Project {
  public name: string;
  public id: string;
  public inspects: any;

  constructor(input: any) {
    this.name = input.name;
    this.id = input.id;

    if (input.inspects) {
      this.inspects = input.inspects;
    }
  }
}
