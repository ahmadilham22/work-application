import { z } from 'zod';

export const createJobValidation = z.object({
  company: z.string(),
  position: z.string(),
  salary: z.string(),
  status: z.enum(['Applied', 'Interviewed', 'Rejected', 'Accepted']),
});

export const updateJobValidation = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  salary: z.string().optional(),
  status: z.enum(['Applied', 'Interviewed', 'Rejected', 'Accepted']).optional(),
});
