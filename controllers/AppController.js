import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
    /**
     * return if redis and DB is alive
     * { "redis": true, "db": true }
     */
    static getStatus(request, response) {
	const status = {
	    redis: redisClient.isAlive(),
	    db: dbClient.isAlive(),
	};
	response.status(200).send(status);
    }

    /**
     * should return number of users and files in DB
     * { "users": 12, "files": 1231 }
     */
    static async getStats(request, response) {
	const stats = {
	    users: await dbClient.nbUsers(),
	    files: await dbClient.nbFiles(),
	};
	response.status(200).send(stats);
    }
}

export default AppController;
