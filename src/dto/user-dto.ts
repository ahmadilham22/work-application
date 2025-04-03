import { User } from '@prisma/client';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export type UserResponse = {
  name: string;
  email: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    email: user.email,
  };
}
