import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../error/response-error';
import { Prisma } from '@prisma/client';

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    res.status(400).json({
      status: 'error',
      message: 'Validation error: ',
      errors: formattedErrors,
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      status: 'error',
      message: 'Database error',
      code: err.code,
      details: err.meta,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
