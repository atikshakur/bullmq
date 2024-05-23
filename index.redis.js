import Redis from 'ioredis'
import bluebird from "bluebird"
bluebird.promisifyAll(Redis)

import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  connectTimeout: 10000,
  enableReadyCheck: true,
  retryStrategy(times) {
    return Math.min(times * 10, 3000)
  },
  maxRetriesPerRequest: null,
}
const redis = new Redis(redisConfig)

redis.on('connect', () => {
  console.log('Redis is connected')
})

redis.on('error', (error) => {
  console.log(error)
  if (error.code === 'ECONNREFUSED') {
    console.log(`Redis server refused the connection`)
    return new Error('Redis server refused the connection')
  }
  console.log(`Redis connection failed`)
  return new Error('Redis connection failed')
})

redis.on('reconnecting', () => {
  console.log('Redis is reconnecting')
})

redis.on('close', () => {
  console.log('Redis connection closed')
})

redis.on('end', () => {
  console.log('Redis disconnected')
})
export default redis
