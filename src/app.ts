import express from 'express';
import morgan from 'morgan';
import modules from './modules';
import Scheduler from './modules/scheduler/SchedulerController';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);
app.use(express.json());

Scheduler.processJobs();
// Disable Arena due to security reasons
// Scheduler.viewJobs();
modules(app);

// catch all routers
app.use('*', (req, res) =>
  res.status(404).json({
    message: 'Not Found. Use /api/v1 to access the api',
  }),
);

export default app;
