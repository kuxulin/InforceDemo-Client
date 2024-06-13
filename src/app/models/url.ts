export default class Url {
  shortVersion: string;
  longVersion: string;
  createdAt: Date;

  constructor(url: any) {
    this.shortVersion = url?.shortVersion;
    this.longVersion = url?.longVersion;
    this.createdAt = url?.createdAt;
  }
}
