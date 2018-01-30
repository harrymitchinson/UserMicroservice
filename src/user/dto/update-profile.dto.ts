import { IsNotEmpty, IsEmail } from "class-validator";
import { BaseDto } from "./base.dto";

/**
 * Update profile data transfer object with validators.
 * @export
 * @class UpdateProfileDto
 * @extends {BaseDto<UpdateProfileDto>}
 */
export class UpdateProfileDto extends BaseDto<UpdateProfileDto> {
  @IsEmail(undefined, { message: "Username is not a valid email address." })
  readonly username: string;

  @IsNotEmpty({ message: "First name must have a value." })
  readonly firstName: string;

  @IsNotEmpty({ message: "Last name must have a value." })
  readonly lastName: string;
}
