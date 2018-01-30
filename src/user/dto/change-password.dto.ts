import {
  Length,
  IsEmail,
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from "class-validator";
import { BaseDto } from "./base.dto";

export function IsNotEqualTo(
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isNotEqualTo",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === "string" &&
            typeof relatedValue === "string" &&
            !(value === relatedValue)
          );
        }
      }
    });
  };
}

export class ChangePasswordDto extends BaseDto<ChangePasswordDto> {
  @Length(8)
  readonly password: string;

  @Length(8)
  @IsNotEqualTo("password", {
    message: "newPassword cannot be the same as password"
  })
  readonly newPassword: string;
}
