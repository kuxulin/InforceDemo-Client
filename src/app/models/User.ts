export default class User {
  name: string;
  roles: string[];

  constructor(user: any) {
    this.name = user.name;
    this.roles = user.roles;
  }
}
