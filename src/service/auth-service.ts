import { ResponseError } from '../error/response-error';
import { UserRepository } from '../repository/user-repository';
import { comparePassword } from '../utils/bcrypt-handler';
import { generateToken } from '../utils/jwt-handler';
import { LoginInput, loginValidation } from '../validation/auth-validation';
import { Validation } from '../validation/validation';
import { UserService } from './user-service';

export class AuthService {
  static async login(user: LoginInput): Promise<string> {
    const userValidated = Validation.validate(loginValidation, user);

    const userExist = await UserService.getByEmail(userValidated.email);

    if (!userExist) {
      throw new ResponseError(404, 'Email or password invalid');
    }

    const passwordCompared = await comparePassword(
      userValidated.password,
      userExist.password
    );

    if (!passwordCompared) {
      throw new ResponseError(400, 'Email or password invalid');
    }

    const token = generateToken({
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    });

    return token;
  }

  
}
