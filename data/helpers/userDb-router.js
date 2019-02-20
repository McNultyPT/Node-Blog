const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The users could not be retrieved.'});
    }
});

module.exports = router;