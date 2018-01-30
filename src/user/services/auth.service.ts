import { sign, verify, SignOptions } from "jsonwebtoken";
import { Component } from "@nestjs/common";
import { User } from "./../schemas/user.schema";
import { JWT_SECRET } from "../../app.constants";

export class AuthTokenResult {
  public constructor(token: string) {
    this.token = token;
  }
  public token: string;
}

@Component()
export class AuthService {
  constructor() {}

  public async create(user: User): Promise<AuthTokenResult> {
    const expiresIn = 60 * 60;
    const options: SignOptions = {
      subject: user.id,
      expiresIn: expiresIn
    };
    const token = sign({}, JWT_SECRET, options);
    return new AuthTokenResult(token);
  }
}
