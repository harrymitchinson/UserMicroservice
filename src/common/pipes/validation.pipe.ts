import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  NotAcceptableException
} from "@nestjs/common";
import { validate, ValidationOptions, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

@Pipe()
export class ValidationPipe implements PipeTransform<any> {

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private extractPrettyErrors(errors: ValidationError[]) {
    const allErrors = errors.map(x => Object.keys(x.constraints).map(y => x.constraints[y]));
    const flatErrors = allErrors.reduce((prev, cur) => prev.concat(cur));
    return flatErrors;
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      validationError: { target: false, value: false }
    });
    if (errors.length > 0) {
      const error = this.extractPrettyErrors(errors);

      throw new NotAcceptableException({
        message: "Validation failed.",
        error: error
      });
    }
    return value;
  }
}
