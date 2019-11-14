import express from 'express';
import middleware from '../../middlewares';
import AuthController from './AuthController';

const authRouter = express.Router();

authRouter.get(
    '/auth/verify',
    AuthController.generateSecretKey,
);

export default authRouter;
