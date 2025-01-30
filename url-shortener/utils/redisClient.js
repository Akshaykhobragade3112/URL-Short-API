const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

client.on('error', function(err) {
    console.error('Redis error: ', err);
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

// Promisify Redis commands to use async/await
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
    getAsync,
    setAsync,
    delAsync,
    client
};
