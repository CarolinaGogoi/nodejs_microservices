import redis from 'redis';
import { REDIS_HOST, REDIS_PORT } from '../config';

// Create Redis Client
export const connectRedis = async () => {
    const client = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT as number,
        retry_strategy: () => 1000
    });

    console.log('Redis Connected!')
    return client
}
