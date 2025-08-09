import jwt from 'jsonwebtoken';

type TPayload = { id: number; name: string; email: string };
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: TPayload): string => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): TPayload => {
  return jwt.verify(token, JWT_SECRET as string) as TPayload;
};
