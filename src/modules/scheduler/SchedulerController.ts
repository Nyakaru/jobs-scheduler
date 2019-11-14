import Bull from 'bull';
import Arena from 'bull-arena';
import { Request, Response } from 'express';
import environment from '../../config/environment';
import redisClient from '../../config/redis';
import redis from '../../cache/redisCache';
import SchedulerService from '../../services/SchedulerService';
import { IJobData, IRequestData, IQueueDetails  } from '../../interfaces/schedulerInterface';
import ResponseHelper from '../../helpers/responseHelper';

class Scheduler {

  /**
   * @description Add new job to existing or new queue
   * @param {IJobData} jobData The data associated with a job
   * @param {Bull.JobOptions} rule The rules specific to that job
   */
  static async addJobToQueue(jobData: IJobData, rule: Bull.JobOptions): Promise<Bull.Job> {
    const { queueName, data: {key, args }} = jobData;
    const jobName: string = `${key}_batch_${Object.values(args)[0]}`;
    const jobsQueue: Bull.Queue = SchedulerService.fetchQueue(queueName);
    const job: Bull.Job = await jobsQueue.add(jobName, jobData, rule);
    return job;
  }

  /**
   * @description Create a job in the scheduler
   * @param {object} req The Http request object
   * @param {object} res The Http response object
   */
  static async createJob(req: Request, res: Response) {
    const data: IRequestData = req.body;
    const clientId: string = req.headers.client_id.toString();
    const { payload } = data;
    const rule: Bull.JobOptions = SchedulerService.generateRule(data);
    const jobData: IJobData = { ...payload, clientId};
    const job: Bull.Job = await Scheduler.addJobToQueue(jobData, rule);
    const message: string = 'Job Succesfully created';
    return ResponseHelper.sendResponse(res, 201, true, message, job);
  }

  static viewJobs() {
    const redisUrl: string = environment.REDIS_URL;
    Arena({
      queues: [
        {
          name: 'routes-queue',
          hostId: 'Tembea_Jobs',
          url: redisUrl,
        },
      ],
  });

  }

  static deleteJob(arg0: string, deleteJob: any): any {
    throw new Error('Method not implemented.');
}

  static  async processJobs() {
    const queues: IQueueDetails[] = await redis.fetchObject('queues');
    if (!queues) {
      redis.saveObject('queues', []);
    } else {
      queues.forEach((queue) => {
        const jobsQueue: Bull.Queue = SchedulerService.fetchQueue(queue.queueName);
        jobsQueue.process('*', SchedulerService.jobProcessor);
      });
    }
  }
}
export default Scheduler;
