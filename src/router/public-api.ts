import express from 'express';
import { UserController } from '../controller/user-controller';

const publicApi = express.Router();

publicApi.post('/api/users', UserController.register);
publicApi.get('/api/users', UserController.get);

export default publicApi;
