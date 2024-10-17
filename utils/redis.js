import redis from 'redis';
import { promisify } from 'util';

/**
 * Redis Class
 */
class RedisClient {
    constructor() {
	this.client = redis.createClient({
	    host: 'localhost',
	    port: 6379
	});
	this.getAsync = promisify(this.client.get).bind(this.client);

	this.client.on('error', (error) => {
	    console.log(`Redis client not connnected to the server: ${error.message}`);
	});

	this.client.on('connect', () => {
	});
    }

    /**
     * checks if redis is connected
     * @return true or false
     */
    isAlive() {
	return this.client.connected;
    }

    /**
     * gets the value of a key
     * @key the key to retrieve
     * @value the value to return
     */
    async get(key) {
	const value = await this.getAsync(key);
	return value;
    }

    /**
     * creates a key
     * @key key
     * @value value
     * @duration duration
     * @return return
     */
    async set (key, value, duration) {
	this.client.setex(key, duration, value);
    }

    /**
     * Deletes key of redis services
     * @key key
     * @value value
     * @return none
     */
    async del(key) {
	this.client.del(key);
    }
}

const redisClient = new RedisClient();

export default redisClient;
