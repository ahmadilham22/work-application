import { Job } from '@prisma/client';

export type TJobWrite = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;
export type TJobRead = Omit<Job, 'createdAt' | 'updatedAt'>;
