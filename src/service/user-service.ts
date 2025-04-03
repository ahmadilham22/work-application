import { prismaClient } from '../application/database';
import { CreateUserDTO, toUserResponse, UserResponse } from '../dto/user-dto';
import bcrypt from 'bcrypt';
import { Validation } from '../validation/validation';
import { userValidation } from '../validation/user-validation';
import { ResponseError } from '../error/response-error';

export class UserService {
  static async register(user: CreateUserDTO): Promise<UserResponse> {
    const userValidated = Validation.validate(userValidation, user);
    const sameEmail = await prismaClient.user.count({
      where: {
        email: userValidated.email,
      },
    });

    if (sameEmail != 0) {
      throw new ResponseError(400, 'Email has been taken');
    }

    userValidated.password = await bcrypt.hash(user.password, 10);

    const result = await prismaClient.user.create({
      data: userValidated,
    });

    return toUserResponse(result);
  }

  static async get(): Promise<UserResponse[]> {
    const result = await prismaClient.user.findMany();

    return result.map(toUserResponse);
  }
}
