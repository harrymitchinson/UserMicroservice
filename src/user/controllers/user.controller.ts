import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Put,
  BadRequestException
} from "@nestjs/common";
import { UserService, AuthService } from "./../services";
import { UpdateProfileDto, ChangePasswordDto } from "./../dto";
import { RequestUser, UserDecorator } from "../decorators/user.decorator";
import { UpdateUserResult } from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put("profile")
  @HttpCode(HttpStatus.OK)
  public async updateProfile(
    @UserDecorator() user: RequestUser,
    @Body() updateProfile: UpdateProfileDto
  ): Promise<UpdateUserResult> {
    try {
      // Update the user's profile.
      const updated = await this.userService.updateProfile(
        user.sub,
        updateProfile
      );

      // Return the result.
      return updated;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put("password")
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @UserDecorator() user: RequestUser,
    @Body() changePassword: ChangePasswordDto
  ): Promise<UpdateUserResult> {
    try {
      // Update the user's password.
      const result = await this.userService.changePassword(
        user.sub,
        changePassword
      );

      // Return the result.
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
