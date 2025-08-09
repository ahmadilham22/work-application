import express from 'express';
import { UserController } from '../controller/user-controller';
import { AuthController } from '../controller/auth-controller';

const publicApi = express.Router();

publicApi.post('/api/users', UserController.register);
publicApi.post('/api/login', AuthController.login);

export default publicApi;
