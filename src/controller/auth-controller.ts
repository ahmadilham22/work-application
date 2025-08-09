import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth-service';
import { UserService } from '../service/user-service';
import { ResponseError } from '../error/response-error';
import { LoginInput } from '../validation/auth-validation';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginInput = req.body;
      const token = await AuthService.login(data);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.APP_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 55 * 60 * 1000,
      });
      res.status(200).json({
        message: 'Login success',
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.APP_ENV !== 'development',
        sameSite: 'strict',
      });
      res.status(200).json({
        message: 'Logout success',
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          message: 'Unauthorized',
        });
        return;
      }
      const user = await UserService.getOne(userId);
      res.status(200).json({
        message: 'Success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
