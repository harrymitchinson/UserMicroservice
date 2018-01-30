import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { BaseDto } from "./base.dto";

/**
 * Create data transfer object with validators.
 * @export
 * @class CreateDto
 * @extends {BaseDto<CreateDto>}
 */
export class CreateDto extends BaseDto<CreateDto> {
  @IsEmail(undefined, { message: "Username is not a valid email address." })
  readonly username: string;

  @Length(8, undefined, { message: "Password must be at least 8 characters." })
  readonly password: string;

  @IsNotEmpty({message: "First name must have a value."}) readonly firstName: string;

  @IsNotEmpty({message: "Last name must have a value."}) readonly lastName: string;
}
