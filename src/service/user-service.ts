import { prismaClient } from '../application/database';
import { TUserRead, TUserWrite } from '../dto/user-dto';
import bcrypt from 'bcrypt';
import { Validation } from '../validation/validation';
import {
  updateUserValidation,
  userValidation,
} from '../validation/user-validation';
import { ResponseError } from '../error/response-error';
import { UserRepository } from '../repository/user-repository';
import { hashPassword } from '../utils/bcrypt-handler';

export class UserService {
  static async register(user: TUserWrite): Promise<TUserRead> {
    const userValidated = Validation.validate(userValidation, user);

    const emailExist = await UserRepository.countUserByEmail(
      userValidated.email
    );

    if (emailExist != 0) {
      throw new ResponseError(400, 'Email has been taken');
    }

    userValidated.password = await hashPassword(userValidated.password);

    const result = await UserRepository.createUser({
      ...userValidated,
    });

    return result;
  }

  static async get(): Promise<TUserRead[]> {
    const result = await UserRepository.getAllUsers();

    return result;
  }

  static async getOne(userId: number): Promise<TUserRead> {
    const result = await UserRepository.getOneUser(userId);

    if (!result) {
      throw new ResponseError(404, 'User not found');
    }

    return result;
  }

  static async update(user: TUserWrite, userId: number) {
    const userValidated = Validation.validate(updateUserValidation, user);

    const existingUser = await this.getOne(userId);

    if (userValidated.email && userValidated.email !== existingUser.email) {
      const emailTaken = await UserRepository.countUserByEmail(
        userValidated.email
      );

      if (emailTaken > 0) {
        throw new ResponseError(400, 'Email has been taken');
      }
    }

    if (userValidated.password) {
      userValidated.password = await hashPassword(userValidated.password);
    }

    return prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userValidated,
      },
    });
  }

  static async remove(userId: number): Promise<void> {
    const userExist = await this.getOne(userId);
    await UserRepository.deleteUser(userExist.id);
  }

  static async getByEmail(email: string): Promise<TUserRead> {
    const result = await UserRepository.findByEmail(email);

    if (!result) {
      throw new ResponseError(404, 'User not found');
    }

    return result;
  }
}
