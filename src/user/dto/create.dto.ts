import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { BaseDto } from "./base.dto";

export class CreateDto extends BaseDto<CreateDto> {
  @IsEmail() readonly username: string;

  @Length(8)
  readonly password: string;

  @IsNotEmpty() readonly firstName: string;

  @IsNotEmpty() readonly lastName: string;
}
