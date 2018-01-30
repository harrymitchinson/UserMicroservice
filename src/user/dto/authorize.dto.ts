import { Length, IsEmail } from "class-validator";
import { BaseDto } from "./base.dto";

/**
 * Authorize data transfer object with validators.
 * @export
 * @class AuthorizeDto
 * @extends {BaseDto<AuthorizeDto>}
 */
export class AuthorizeDto extends BaseDto<AuthorizeDto> {
  @IsEmail(undefined, { message: "Username is not a valid email address." })
  readonly username: string;

  @Length(8, undefined, { message: "Password must be at least 8 characters." })
  readonly password: string;
}
