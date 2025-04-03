import { Request, Response, NextFunction } from 'express';
import { CreateUserDTO, UserResponse } from '../dto/user-dto';
import { UserService } from '../service/user-service';

/**
 * Controller untuk menangani endpoint user
 */
export class UserController {
  /**
   * Mendaftarkan user baru
   *
   * @route POST /api/users
   * @param req - Request dari client, body harus berupa CreateUserDTO
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 201 Created - Mengembalikan data user(tanpa password)
   */
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDTO = req.body;

      const result: UserResponse = await UserService.register(data);

      res.status(201).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mendaftarkan user baru
   *
   * @route GET /api/users
   * @param req - Request dari client, body harus berupa CreateUserDTO
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 200 Success - Mengembalikan data array user(tanpa password)
   */
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result: UserResponse[] = await UserService.get();
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
