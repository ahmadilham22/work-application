import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware';
import publicApi from '../router/public-api';

// Inisiasi express
export const web = express();

// Middleware untuk parsing ke JSON
web.use(express.json());

// Menggunakan route publicAPi\I
web.use(publicApi);

// Menggunakan Error Middleware
web.use(errorMiddleware);
