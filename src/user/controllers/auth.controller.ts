import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  BadRequestException,
  Query
} from "@nestjs/common";
import { UserService, AuthService } from "./../services";
import { CreateDto, AuthorizeDto } from "./../dto";
import { AuthTokenResult } from "../services/auth.service";
import { ExistingUserResult } from "../services/user.service";

@Controller("auth")
export class AuthContoller {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("new")
  @HttpCode(HttpStatus.CREATED)
  public async new(@Body() dto: CreateDto): Promise<AuthTokenResult> {
    try {
      // Create the user.
      const user = await this.userService.create(dto);

      // Create an auth token for the user.
      const token = await this.authService.create(user);

      // Return the token.
      return token;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async authorize(@Body() dto: AuthorizeDto): Promise<AuthTokenResult> {
    try {
      // Verify the user.
      const user = await this.userService.verify(dto);

      // Create an auth token for the user.
      const token = await this.authService.create(user);

      // Return the token.
      return token;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post("exists")
  @HttpCode(HttpStatus.OK)
  public async checkIfExists(
    @Query("username") username: string
  ): Promise<ExistingUserResult> {
    try {
      // Check whether the user exists.
      const existing = await this.userService.checkIfExists(username);

      // Return the result.
      return existing;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
