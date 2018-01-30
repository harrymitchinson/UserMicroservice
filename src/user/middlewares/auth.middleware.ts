import {
  Middleware,
  NestMiddleware,
  ExpressMiddleware,
  UnauthorizedException
} from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./../../app.constants";

// Add the user object to express request interface.
declare module "express" {
  interface Request {
    user: any;
  }
}

/**
 * Request authorization middleware.
 * @export
 * @class AuthMiddleware
 * @implements {NestMiddleware}
 */
@Middleware()
export class AuthMiddleware implements NestMiddleware {
  /**
   * Gets the authorization token from the request header.
   * @private
   * @param {Request} req
   * @returns
   * @memberof AuthMiddleware
   */
  private getTokenFromHeader(req: Request): string {
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

  /**
   * Verifies the auth token from the request header.
   * @private
   * @param {string} token
   * @returns
   * @memberof AuthMiddleware
   */
  private verifyToken(token: string) {
    try {
      const verifiedToken = verify(token, JWT_SECRET);
      return verifiedToken;
    } catch (err) {
      throw new UnauthorizedException("Invalid token.", err);
    }
  }

  /**
   * Verifies the auth token from the request header and assigns it to the request user.
   * @returns {ExpressMiddleware}
   * @memberof AuthMiddleware
   */
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
