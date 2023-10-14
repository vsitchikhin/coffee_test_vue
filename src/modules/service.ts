export class Service {
  protected apiHeaders: { [key: string]: string };
  protected baseUrl = import.meta.env.VITE_BASE_URL;

  public constructor() {
    this.apiHeaders = {};
  }
}
