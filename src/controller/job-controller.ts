import { Request, Response, NextFunction } from 'express';
import { JobService } from '../service/job-service';
import { TJobWrite } from '../dto/job-dto';

export class JobController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const job = req.body;
      const userId = req.user!.id;
      const result = await JobService.create(job, userId);
      res.status(201).json({
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { company, position } = req.query;
      const result = await JobService.listJob({
        company: company as string | undefined,
        position: position as string | undefined,
      });
      res.status(200).json({
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await JobService.getJobById(id);
      res.status(200).json({
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await JobService.getJobByUserId(userId);
      res.status(200).json({
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await JobService.removeJob(id);
      res.status(200).json({
        message: 'Success remove data',
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const job: TJobWrite = req.body;
      const result = await JobService.updateJob(job, id);
      res.status(200).json({
        message: 'Success update data',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
