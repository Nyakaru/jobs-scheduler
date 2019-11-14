import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import redis from '../cache/redisCache';
import ErrorHandler from '../helpers/errorHandler';
import ResponseHandler from '../helpers/responseHelper';

class AuthValidator {
  static async authenticateClient(req: Request, res: Response, next: NextFunction) {
    const { client_id, client_secret } = req.headers;
    if (!client_id || !client_secret) {
      const message = 'Please Provide client_id and client_secret';
      return ErrorHandler.handleError(message, 401, res);
    }
    const client = await redis.fetchObject(client_id.toString());
    const authenticated = client && client_secret === client.clientSecret;
    if (!authenticated) {
      const message = 'Unknown client';
      return ErrorHandler.handleError(message, 401, res);
      }
    next();
  }

  static async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;
    if (!token) {
      const message = 'No token provided';
      return ResponseHandler.sendResponse(res, 401, false, message);
    }

    try {
      const secret = Buffer.from(process.env.AIS_PUBLIC_KEY, 'base64').toString('ascii');
      await jwt.verify(token, secret);
      next();
    } catch (error) {
      const errorMessage = 'Failed to authenticate token! Valid token required';
      return ResponseHandler.sendResponse(res, 401, false, errorMessage);
    }
  }
}

export default AuthValidator;
