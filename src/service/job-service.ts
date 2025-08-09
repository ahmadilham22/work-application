import { prismaClient } from '../application/database';
import { TJobRead, TJobWrite } from '../dto/job-dto';
import { ResponseError } from '../error/response-error';
import {
  createJobValidation,
  updateJobValidation,
} from '../validation/job-validation';
import { Validation } from '../validation/validation';

export class JobService {
  static async create(job: TJobWrite, userId: number): Promise<TJobRead> {
    const jobValidated = Validation.validate(createJobValidation, job);

    const { userId: _ignored, ...jobDataWithoutUserId } = jobValidated;

    const result = await prismaClient.job.create({
      data: {
        ...jobDataWithoutUserId,
        user: {
          connect: { id: userId },
        },
      },
    });

    return result;
  }

  static async listJob(params: {
    company?: string;
    position?: string;
  }): Promise<TJobRead[]> {
    const where: any = {};

    if (params.company) {
      where.company = { contains: params.company, mode: 'insensitive' };
    }

    if (params.position) {
      where.position = { contains: params.position, mode: 'insensitive' };
    }

    const result = await prismaClient.job.findMany({
      where,
    });

    return result;
  }

  static async getJobById(id: number): Promise<TJobRead | null> {
    const result = await prismaClient.job.findUnique({
      where: { id },
    });

    if (!result) {
      throw new ResponseError(404, 'Job not found');
    }

    return result;
  }

  static async getJobByUserId(userId: number): Promise<TJobRead[]> {
    const result = await prismaClient.job.findMany({
      where: { userId: userId },
    });

    if (!result) {
      throw new ResponseError(404, 'Job not found');
    }

    return result;
  }

  static async removeJob(id: number): Promise<void> {
    const jobExist = await this.getJobById(id);
    await prismaClient.job.delete({
      where: {
        id: jobExist?.id,
      },
    });
  }

  static async updateJob(job: TJobWrite, id: number) {
    const jobValdiated = Validation.validate(updateJobValidation, job);

    const jobExist = this.getJobById(id);

    return prismaClient.job.update({
      where: {
        id: id,
      },
      data: jobValdiated,
    });
  }
}
