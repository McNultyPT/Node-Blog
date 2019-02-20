const express = require('express');

const postDbRouter = require('./data/helpers/postDb-router');
const userDbRouter = require('./data/helpers/userDb-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postDbRouter);
server.use('/api/users', userDbRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>Test Message</h1>
    `)
});

module.exports = server;