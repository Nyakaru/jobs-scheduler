import request from 'request';
import SchedulerService from '../SchedulerService';
import redis from '../../cache/redisCache';

describe('SchedulerHelper', () => {
  let job: any;
  const requestObject = jest.spyOn(request, 'post');

  beforeEach(() => {
    job = {
      data: {
        callbackUrl: 'https/job',
        data:  {},
        clientId: 'tem',
      },
    };
    jest
      .spyOn(redis, 'fetchObject')
      .mockResolvedValue({ clientId: 'tem', clientSecret: 'xmnxnxnxn' });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
  it('Should process a job', async (done) => {
    await SchedulerService.jobProcessor(job, done);
    expect(redis.fetchObject).toHaveBeenCalledWith('tem');
    expect(requestObject).toHaveBeenCalledWith({
      url: 'https/job',
      body: {},
      headers: {
        scheduler_secret: 'xmnxnxnxn',
      },
      json: true,
    }, expect.any(Function));
    done();
  });
});
