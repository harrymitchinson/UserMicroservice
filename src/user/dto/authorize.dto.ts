import { Length, IsEmail } from "class-validator";
import { BaseDto } from "./base.dto";

export class AuthorizeDto extends BaseDto<AuthorizeDto> {
  @IsEmail() readonly username: string;

  @Length(8)
  readonly password: string;
}
