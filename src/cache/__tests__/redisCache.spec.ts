import redis from '../../config/redis';
import RedisCache from '../redisCache';
const client = redis.createClient('client');

describe('RedisCacheSingleton', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should save to cache', async (done) => {
    const setRedis = jest.spyOn(client, 'set');
    await RedisCache.saveObject('key', { client: 'tembea' });
    expect(setRedis).toHaveBeenCalledTimes(1);
    done();
  });
  it('should fetch from cache', async (done) => {
    const getRedis = jest.spyOn(client, 'get');
    await RedisCache.fetchObject('key');
    expect(getRedis).toHaveBeenCalledTimes(1);
    done();
  });
});
