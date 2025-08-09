import * as express from 'express';
import { UserResponse } from '../../dto/user-dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
