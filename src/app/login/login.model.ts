export class UserModel {
  userId: string;
  username: string;
  password: string;

  constructor(userId: string, username: string, password: string) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
