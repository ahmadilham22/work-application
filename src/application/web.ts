import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware';
import publicApi from '../router/public-api';
import cookieParser from 'cookie-parser';
import privateApi from '../router/private-api';
import cors from 'cors';
// Inisiasi express
export const web = express();

// Middleware untuk parsing ke JSON
web.use(express.json());
web.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};
web.use(cors(corsOptions));

// Menggunakan route publicAPi
web.use(publicApi);
web.use(privateApi);

// Menggunakan Error Middleware
web.use(errorMiddleware);
