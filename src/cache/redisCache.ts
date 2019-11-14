import Redis from 'ioredis';
import RedisClient from '../config/redis';

const client: Redis.Redis = RedisClient.createClient('client');

class RedisCache {
static async saveObject(key: Redis.KeyType, value: object) {
    return await client.set(key, JSON.stringify(value));
}

static async fetchObject(key: Redis.KeyType) {
    const result = await client.get(key);
    const clientData: any =  JSON.parse(result);
    return clientData;
  }
}

export default RedisCache;
