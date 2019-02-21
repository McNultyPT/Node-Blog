const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.use(upperCase);

function upperCase(req, res, next) {
    if (!req.body.name) {
        next();
    } else {
        req.body.name = req.body.name.toUpperCase();
        next();
    }
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The users could not be retrieved.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'A user with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The user could not be retrieved.'});
    }
});

router.get('/:id/posts', async (req, res) => {
    try {
        const user = await Users.getUserPosts(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'A user with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The user posts could not be retrieved.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = await Users.remove(req.params.id);

    try {
        if (id) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'A user with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The user could not be removed.'});
    }
});

router.post('/', async (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name)
        return res.status(400).json({ errorMessage: 'Please provide a name for the user.'});

    try {
        const user = await Users.insert(userInfo);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error saving the user.'});
    }
});

router.put('/:id', async (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name)
        return res.status(400).json({ errorMessage: 'Please provide a name for the user.'});

    try {
        const user = await Users.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'A user with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The user information could not be changed.'});
    }
});

module.exports = router;