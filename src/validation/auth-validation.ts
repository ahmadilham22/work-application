import { z } from 'zod';

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = loginValidation.extend({
  // Add additional fields here if needed
});

export type LoginInput = z.infer<typeof loginValidation>;
