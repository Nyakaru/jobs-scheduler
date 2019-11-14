import Bull from 'bull';
import request from 'request';
import {
  IJobData,
  IRequestOptions,
  IRequestData,
  IQueueDetails,
} from '../interfaces/schedulerInterface';
import SchedulerHelper from '../helpers/schedulerHelpers';
import { IClientData } from '../interfaces/redisInterface';
import redis from '../cache/redisCache';
import redisClient from '../config/redis';
class SchedulerService {

  static fetchQueue(queName: string): Bull.Queue {
    const queue: Bull.Queue = new Bull(queName, redisClient);
    return queue;
  }

  static async registerQueue(queueName: string) {
    const queues: IQueueDetails[] = await redis.fetchObject('queues');
    if (!queues.length) {
      queues.push({ queueName });
      redis.saveObject('queues', queues);
    } else {
      queues.forEach((queue) => {
        if (queue.queueName !== queueName) {
          queues.push({ queueName });
          redis.saveObject('queues', queues);
        }

      });
    }
  }

  static jobProcessor = async (
    job: Bull.Job,
    done: Bull.DoneCallback,
    retry: number = 3,
  ) => {
    const jobData: IJobData = job.data;
    const { callbackUrl, data, clientId } = jobData;
    const client: IClientData = await redis.fetchObject(clientId);
    const clientSecret: string = client.clientSecret;
    const options: IRequestOptions = {
      url: callbackUrl,
      body: data,
      headers: {
        scheduler_secret: clientSecret,
      },
      json: true,
    };

    request.post(options, (error) => {
      if (error) {
        return retry > 0 && SchedulerService.jobProcessor(job, done, retry - 1);
      }
    });
    done();
  }

  static reccurringJob(isSequential: boolean, repeatTime: string, repeatSequence: string,
  ): Bull.JobOptions {
    let rule: Bull.JobOptions = {};
    if (isSequential) {
      const repeatDuration: number = SchedulerHelper.getRepeatTime(
        repeatSequence,
      );
      rule = { repeat: { every: repeatDuration } };
    } else {
      const cronPattern = SchedulerHelper.generateCron(repeatTime);
      rule = { repeat: { cron: cronPattern } };
    }
    return rule;
  }

  static singleJob(time: string): Bull.JobOptions {
    const rule: Bull.JobOptions = {};
    const cronPattern: string = SchedulerHelper.generateCron(time);
    rule.removeOnComplete = true;
    rule.repeat = { cron: cronPattern, limit: 1 };
    return rule;
  }

  static generateRule(data: IRequestData): Bull.JobOptions {
    const { isRecurring, timeZone, time,
      cron: { repeatTime, isSequential, repeatSequence },
    } = data;
    let rule: Bull.JobOptions = {};
    if (isRecurring) {
      rule = SchedulerService.reccurringJob(isSequential, repeatTime, repeatSequence);
    } else {
      rule = SchedulerService.singleJob(time);
    }
    rule.repeat = { ...rule.repeat, tz: timeZone };
    return rule;
  }
}

export default SchedulerService;
