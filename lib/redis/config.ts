export interface RedisConfig {
  useLocalRedis: boolean
  upstashRedisRestUrl?: string
  upstashRedisRestToken?: string
  localRedisUrl: string
}

export const redisConfig: RedisConfig = {
  useLocalRedis: false, // Completely disable Redis
  upstashRedisRestUrl: undefined,
  upstashRedisRestToken: undefined,
  localRedisUrl: 'redis://localhost:6379'
}

// Redis wrapper class
export class RedisWrapper {
  private client: any

  constructor(client: any) {
    this.client = client
  }

  async hgetall<T>(key: string): Promise<T | null> {
    try {
      return await this.client.hgetall(key)
    } catch (error) {
      console.error('Redis hgetall error:', error)
      return null
    }
  }

  async hmset(key: string, data: any): Promise<void> {
    try {
      await this.client.hmset(key, data)
    } catch (error) {
      console.error('Redis hmset error:', error)
    }
  }

  async zrange(
    key: string,
    start: number,
    stop: number,
    options?: any
  ): Promise<string[]> {
    try {
      return await this.client.zrange(key, start, stop, options)
    } catch (error) {
      console.error('Redis zrange error:', error)
      return []
    }
  }

  async zadd(key: string, score: number, member: string): Promise<void> {
    try {
      await this.client.zadd(key, score, member)
    } catch (error) {
      console.error('Redis zadd error:', error)
    }
  }

  async zrem(key: string, member: string): Promise<void> {
    try {
      await this.client.zrem(key, member)
    } catch (error) {
      console.error('Redis zrem error:', error)
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key)
    } catch (error) {
      console.error('Redis del error:', error)
    }
  }

  async pipeline(): Promise<any> {
    try {
      return this.client.pipeline()
    } catch (error) {
      console.error('Redis pipeline error:', error)
      return {
        del: () => this,
        zrem: () => this,
        exec: async () => []
      }
    }
  }
}

// Function to get a Redis client - now always returns null
export async function getRedisClient(): Promise<RedisWrapper | null> {
  // Always return null to disable Redis completely
  return null
}
