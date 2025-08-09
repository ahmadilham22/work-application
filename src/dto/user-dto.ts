import { User } from '@prisma/client';

export type TUserRead = Omit<User, 'createdAt' | 'updatedAt'>;
export type TUserWrite = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
