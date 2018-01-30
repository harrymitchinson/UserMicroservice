import {
  Length,
  IsEmail,
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from "class-validator";
import { BaseDto } from "./base.dto";

/**
 * Validator for checking a property is not equal to target property.
 * @export
 * @param {string} property
 * @param {ValidationOptions} [validationOptions]
 * @returns
 */
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

/**
 * Change password data transfer object with validators.
 * @export
 * @class ChangePasswordDto
 * @extends {BaseDto<ChangePasswordDto>}
 */
export class ChangePasswordDto extends BaseDto<ChangePasswordDto> {
  @Length(8, undefined, { message: "Password must be at least 8 characters." })
  readonly password: string;

  @Length(8, undefined, {
    message: "New password must be at least 8 characters."
  })
  @IsNotEqualTo("password", {
    message: "New password cannot be the same as password"
  })
  readonly newPassword: string;
}
