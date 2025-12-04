export class User {
  public userName: string;
  public email: string;
  public role: string;

  constructor(model: any) {
    this.userName = model.userName;
    this.email = model.email;
    this.role = model.role;
  }

  public isAdmin(): boolean {
    return this.role === "Admin";
  }
}
