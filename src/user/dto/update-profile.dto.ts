import { IsNotEmpty, IsEmail } from "class-validator";
import { BaseDto } from "./base.dto";

export class UpdateProfileDto extends BaseDto<UpdateProfileDto> {
  @IsEmail() readonly username: string;

  @IsNotEmpty() readonly firstName: string;

  @IsNotEmpty() readonly lastName: string;
}
