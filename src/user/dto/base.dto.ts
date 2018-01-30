export class BaseDto<T> {
  constructor(data?: Partial<T>) {
    Object.assign(this, data);
  }
}
