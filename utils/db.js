import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || files_manager;
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Class
 */
class DBClient {
    constructor() {
	MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	    if (!err) {
		this.db = client.db(DB_DATABASE);
		this.usersCollection = this.db.collection('users');
		this.filesCollection = this.db.collection('files');
	    } else {
		console.log(err.message);
		this.db = false;
	    }
	});
    }

    /**
     * check if connection is alive
     * @return return
     */
    isAlive() {
	return Boolean(this.db);
    }

    /**
     * returns the number of documents
     * @return number of users
     */
    async nbUsers() {
	const numberOfUsers = this.usersCollection.countDocuments();
	return numberOfUsers;
    }

    /**
     * returns the number of documents
     * @return number of files
     */
    async nbFiles() {
	const numberOfFiles = this.filesCollection.countDocuments();
	return numberOfFiles;
    }
}

const dbClient = new DBCClient();

export default dbClient;
