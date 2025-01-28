const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();
const users = []; // In-memory storage for users

router.get('/:username', (req, res) => {
    const { username } = req.params;
    logger.info(`Fetching user: ${username}`);
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
});

router.post('/', (req, res) => {
    const { username, firstName, lastName, birthday } = req.body;
    if (!username || !firstName || !lastName || !birthday) {
        logger.error('Invalid user payload');
        return res.status(400).json({ error: 'Invalid user payload' });
    }
    const newUser = { username, firstName, lastName, birthday };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.delete('/:username', (req, res) => {
    const { username } = req.params;
    const index = users.findIndex(u => u.username === username);
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    const [deletedUser] = users.splice(index, 1);
    res.status(200).json(deletedUser);
});

module.exports = router;
