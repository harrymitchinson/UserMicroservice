import {
  Middleware,
  NestMiddleware,
  ExpressMiddleware,
  UnauthorizedException
} from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./../../app.constants";

declare module "express" {
  interface Request {
    user: any;
  }
}

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  private getTokenFromHeader(req: Request) {
    const authorization = req.headers.authorization;
    if (authorization === undefined) {
      throw new UnauthorizedException("No authorization token was found.");
    }

    const parts = authorization.toString().split(" ");

    if (parts.length !== 2) {
      throw new UnauthorizedException("No authorization token was found.");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedException(
        "Format is authorization: Bearer [token]."
      );
    }
    return token;
  }

  private verifyToken(token: string) {
    try {
      const verifiedToken = verify(token, JWT_SECRET);
      return verifiedToken;
    } catch (err) {
      throw new UnauthorizedException("Invalid token.", err);
    }
  }

  resolve(): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = this.getTokenFromHeader(req);
        const user = this.verifyToken(token);
        req.user = user;
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}
