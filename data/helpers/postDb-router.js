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

    if (!postInfo.text)
        return res.status(400).json({ errorMessage: 'Please provide text for the post.'});

    try {
        const post = await Posts.insert(postInfo);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error while saving this post.'});
    }
});

module.exports = router;