export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public email: string,
    public accessToken: string,
    public refreshToken: string,
  ) {
  }

}
