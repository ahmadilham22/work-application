import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt-handler';
import { UserService } from '../service/user-service';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized: Token not found',
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const authUser = await UserService.getByEmail(decoded.email);

    if (!authUser) {
      res.status(401).json({
        message: 'Unauthorized: User not found',
      });
      return;
    }

    req.user = authUser;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized: Invalid token',
    });
  }
};
