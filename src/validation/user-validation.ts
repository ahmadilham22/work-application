import { z } from 'zod';

export const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updateUserValidation = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});
