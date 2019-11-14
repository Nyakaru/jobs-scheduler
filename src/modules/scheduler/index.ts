import express from 'express';
import middleware from '../../middlewares';
import Scheduler from './SchedulerController';

const { SchedulerValidator, AuthValidator } = middleware;

const schedulerRouter = express.Router();

schedulerRouter.post(
    '/jobs',
    AuthValidator.authenticateClient,
    SchedulerValidator.validateInputs,
    Scheduler.createJob,

);

schedulerRouter.delete(
    'jobs/:id',
    Scheduler.deleteJob,

);

export default schedulerRouter;
