const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The posts could not be retrieved." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'A post with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be retrieved.'});
    }
});

router.post('/', async (req, res) => {
    const postInfo = req.body;

    if (!postInfo.text || !postInfo.user_id)
        return res.status(400).json({ errorMessage: 'Please provide text and user ID for the post.'});

    try {
        const post = await Posts.insert(postInfo);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error while saving this post.'});
    }
});

router.delete('/:id', async (req, res) => {
    const id = await Posts.remove(req.params.id);

    try {
        if (id) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'A post with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be removed'});
    }
});

router.put('/:id', async (req, res) => {
    const postInfo = req.body;

    if (!postInfo.text) 
        return res.status(400).json({ errorMessage: 'Please provide text to update.'});

    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'A post with that ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be modified.'});
    }
});

module.exports = router;