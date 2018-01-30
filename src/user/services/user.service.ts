import { Component, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./../schemas/user.schema";
import { UpdateProfileDto, ChangePasswordDto, CreateDto } from "./../dto";
import { AuthorizeDto } from "./../dto/authorize.dto";
import { USER_MODEL_TOKEN } from "./../../app.constants";

export class ExistingUserResult {
  public existing: boolean;
  public constructor(existing: boolean) {
    this.existing = existing;
  }
}

export class UpdateUserResult {
  public updated: boolean;
  public constructor(updated: boolean) {
    this.updated = updated;
  }
}

@Component()
export class UserService {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<User>
  ) {}

  public async findByUserId(id: string): Promise<User> {
    // Create the query for finding the user.
    const query = this.userModel.findById(id);

    // Execute the query.
    const user = await query.exec();

    // Throw if the user does not exist. Ideally would just check for undefined here but mongoose uses null instead.
    if (user === null || user === undefined) {
      throw new Error("User does not exist.");
    }

    // Return the user.
    return user;
  }

  public async create(dto: CreateDto): Promise<User> {
    try {
      // Create the query for creating the user.
      const query = new this.userModel(dto);

      // Execute the query.
      const user = await query.save();

      // Return the user.
      return user;
    } catch (err) {
      // Throw if there is already a user with that username.
      throw new Error("User already exists.");
    }
  }

  public async verify(dto: AuthorizeDto): Promise<User> {
    // Create the query for finding the user.
    const query = this.userModel.find({ username: dto.username }).limit(1);

    // Execute the query.
    const users = await query.exec();

    // Throw if there are not matching users.
    if (users.length === 0) {
      throw new Error("User not found.");
    }

    // Assign the user.
    const [user] = users;

    // Verify the user provided the correct password for this user.
    const verified = await user.comparePassword(dto.password);

    // Throw if they provided an incorrect password.
    if (verified === false) {
      throw new Error("Incorrect password.");
    }

    // Return the user.
    return user;
  }

  public async updateProfile(
    id: string,
    dto: UpdateProfileDto
  ): Promise<UpdateUserResult> {
    // Fetch the user.
    const user = await this.findByUserId(id);

    // Update the user properties.
    user.username = dto.username;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    // Create the result object.
    const result = new UpdateUserResult(false);

    // Check whether any properties were updated.
    const updated = user.isModified();

    // Save the user and update the results object if the user was updated at all.
    if (updated === true) {
      await user.save();
      result.updated = true;
    }

    // Return the result object.
    return result;
  }

  public async checkIfExists(username: string): Promise<ExistingUserResult> {
    // Create the query for finding the users.
    const query = this.userModel.find({ username: username }).limit(1);

    // Execute the query.
    const users = await query.exec();

    // Create the result object.
    const result = new ExistingUserResult(false);

    // Update the result object if a user exists.
    if (users.length > 0) {
      result.existing = true;
    }

    // Return the result object.
    return result;
  }

  public async changePassword(
    id: string,
    dto: ChangePasswordDto
  ): Promise<UpdateUserResult> {
    // Fetch the user.
    const user = await this.findByUserId(id);

    // Compare the provided password with the actual password for the user.
    const verified = await user.comparePassword(dto.password);

    // Throw if the provided password is incorrect.
    if (verified === false) {
      throw new Error("Incorrect password.");
    }

    // Update the user's password and save.
    user.password = dto.newPassword;
    await user.save();

    // Create the result object.
    const result = new UpdateUserResult(true);

    // Return the result object.
    return result;
  }
}
