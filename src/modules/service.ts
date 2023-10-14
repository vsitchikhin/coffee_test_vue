export class Service {
  protected apiHeaders: { [key: string]: string };
  protected baseUrl: string = process.env.BASE_URL;

  public constructor() {
    this.apiHeaders = {};
  }
}
