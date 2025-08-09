import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { TUserRead, TUserWrite } from '../dto/user-dto';

export class UserRepository {
  static async createUser(data: TUserWrite): Promise<TUserRead> {
    const now = new Date();
    const result = await prismaClient.$queryRaw<TUserRead>`
    INSERT INTO users (name, email, password, "updatedAt") VALUES (${data.name}, ${data.email}, ${data.password}, ${now}) RETURNING id, name, email
    `;

    return result;
  }

  static async getAllUsers(): Promise<TUserRead[]> {
    const result = await prismaClient.$queryRaw<TUserRead[]>`
    SELECT id, name, email FROM users
    `;

    return result;
  }

  static async getOneUser(userId: number): Promise<TUserRead> {
    const result = await prismaClient.$queryRaw<TUserRead[]>`
    SELECT id, name, email FROM users WHERE id = ${userId}
    `;

    return result[0];
  }

  static async countUserByEmail(email: string): Promise<number> {
    const result = await prismaClient.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) FROM users WHERE email = ${email}
    `;

    const count = Number(result[0].count);

    return count;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    return result;
  }

  static async deleteUser(userId: number): Promise<void> {
    await prismaClient.$queryRaw`
    DELETE FROM users WHERE id = ${userId}
    `;
  }
}
