export default class Url {
  id: string;
  shortVersion: string;
  longVersion: string;
  createdAt: Date;

  constructor(url: any) {
    this.id = url?.id;
    this.shortVersion = url?.shortVersion;
    this.longVersion = url?.longVersion;
    this.createdAt = url?.createdAt;
  }
}
