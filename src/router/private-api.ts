import express from 'express';
import { UserController } from '../controller/user-controller';
import { AuthController } from '../controller/auth-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { JobController } from '../controller/job-controller';

const privateApi = express.Router();

privateApi.post('/api/auth/logout', authMiddleware, AuthController.logout);
privateApi.get('/api/me', authMiddleware, AuthController.me);

privateApi.get('/api/users', authMiddleware, UserController.get);
privateApi.put('/api/users/:id', authMiddleware, UserController.update);
privateApi.get('/api/users/:id', authMiddleware, UserController.getOne);
privateApi.delete('/api/users/:id', authMiddleware, UserController.remove);

privateApi.post('/api/jobs', authMiddleware, JobController.create);
privateApi.get('/api/jobs', authMiddleware, JobController.get);
privateApi.get('/api/jobs/mine', authMiddleware, JobController.getByUserId);
privateApi.get('/api/jobs/:id', authMiddleware, JobController.getById);
privateApi.delete('/api/jobs/:id', authMiddleware, JobController.remove);
privateApi.put('/api/jobs/:id', authMiddleware, JobController.update);

export default privateApi;
