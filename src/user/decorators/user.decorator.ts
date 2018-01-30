import { createRouteParamDecorator, PipeTransform } from "@nestjs/common";
import { Request } from "express";

/**
 * Get the user from the request.
 * @export
 * @param {any} data
 * @param {any} req
 * @returns {RequestUser}
 */
export const decoratorFunction = (data: any, req: any): RequestUser => {
  return req.user;
};

/**
 * Decorator to get the user from the request.
 * @export
 * @returns {ParameterDecorator}
 */
export const UserDecorator = createRouteParamDecorator(decoratorFunction);

/**
 * The user's auth token.
 * @export
 * @class RequestUser
 */
export class RequestUser {
  sub: string;
}
