/**
 * User represents I1820 users.
 */
export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public email: string,
    public projects: string[],
    public accessToken: string,
    public refreshToken: string,
  ) {
  }

}
