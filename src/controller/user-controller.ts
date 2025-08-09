import { Request, Response, NextFunction } from 'express';
import { TUserRead, TUserWrite } from '../dto/user-dto';
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
      const data: TUserWrite = req.body;

      const result: TUserRead = await UserService.register(data);

      res.status(201).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mengambil data semua user
   *
   * @route GET /api/users
   * @param req - Request dari client
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 200 Success - Mengembalikan data array user(tanpa password)
   */
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result: TUserRead[] = await UserService.get();
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Memperbarui data
   *
   * @route PUT /api/users/:id
   * @param req - Request dari client
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 200 Success - Mengembalikan pesan
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.id);
      const data: TUserWrite = req.body;
      const result = await UserService.update(data, userId);
      res.status(200).json({
        message: 'Successfully update data',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mengambil data satu user berdasarkan id
   *
   * @route GET /api/users/:id
   * @param req - Request dari client
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 200 Success - Mengembalikan data user
   */
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      const data: TUserRead = await UserService.getOne(userId);
      res.status(200).json({
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Menghapus data user
   *
   * @route DELETE /api/users/:id
   * @param req - Request dari client
   * @param res - Response yang dikirim ke client
   * @param next - Middleware Error Handler
   * @returns 200 Success - Mengembalikan message
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.remove(userId);
      res.status(200).json({
        message: 'Successfully delete data',
      });
    } catch (error) {
      next(error);
    }
  }
}
