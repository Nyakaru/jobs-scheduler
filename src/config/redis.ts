import Redis from 'ioredis';
import environment from './environment';

const  client: Redis.Redis = new Redis(environment.REDIS_URL);
const subscriber: Redis.Redis = new Redis(environment.REDIS_URL);

const  redisClient  = {
  createClient(type: string): Redis.Redis {
    switch (type) {
      case 'client':
        return client;
      case 'subscriber':
        return subscriber;
      default:
        return new Redis(environment.REDIS_URL);
    }
  },
};

export default redisClient;
