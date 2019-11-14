import supertest from 'supertest';
import app from '../../../app';
import redisCache from '../../../cache/redisCache';
import { mockJobObject } from '../__mocks__/mockData';

const request = supertest(app);
const url = '/api/v1/jobs';

describe('SchedulerController', () => {
  let headers: object;

  beforeEach(() => {
    headers = {
      Accept: 'application/json',
      client_id: 'tem',
      client_secret: 'xmnxnxnxn',
    };
    jest.spyOn(redisCache, 'fetchObject').mockResolvedValue({ clientId: 'tem', clientSecret: 'xmnxnxnxn' });
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('UnAuthenticated user', () => {
    it('should check user has a valid secret key', async (done) => {
      const res = await request
      .post(url)
      .send(mockJobObject.isReccurringFalse);
      // expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Please Provide client_id and client_secret');
      done();
    });
    it('should check user has a valid secret key', async (done) => {
      const res = await request
      .post(url)
      .send(mockJobObject.isReccurringFalse)
      .set({ client_id: 'tem',
      client_secret: 'xmnx',
    });
      expect(res.status).toEqual(401);
      expect(res.body.message).toEqual('Unknown client');
      done();
    });
  });
  describe('validate user input', () => {
    it('should respond with isReccuring is required', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.noReccurringMock)
        .set(headers);
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual(
        'Validation error occurred, see error object for details',
      );
      expect(res.body.error.isRecurring).toEqual('Please provide isRecurring');
      done();
    });

    it('should fail if isReccuring is false and time is not provided', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.isReccurringFalse)
        .set(headers);
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual(
        'Validation error occurred, see error object for details',
      );
      expect(res.body.error.time).toEqual('Please provide time');
      done();
    });
    it('should fail if isReccuring is true and cron is not provided', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.isReccurringTrue)
        .set(headers);
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual(
        'Validation error occurred, see error object for details',
      );
      expect(res.body.error.cron).toEqual('Please provide cron');
      done();
    });
    it(`should fail if time is not in 'DD-MM : HH:mm' format`, async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.wrongFormatTime)
        .set(headers);
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual(
        'Validation error occurred, see error object for details',
      );
      expect(res.body.error.time).toEqual(
        `time must be in the format 'DD-MM HH:mm'`,
      );
      done();
    });
  });

  describe('Create job', () => {
    it('should create a one time job', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.singleJobMock)
        .set(headers);
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('Job Succesfully created');
      done();
    });

    it('should create a repeatable job', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.repeatableJobMock)
        .set(headers);
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('Job Succesfully created');
      done();
    });

    it('should create a sequential job', async (done) => {
      const res = await request
        .post(url)
        .send(mockJobObject.sequentialJobMock)
        .set(headers);
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('Job Succesfully created');
      done();
    });
  });
});
