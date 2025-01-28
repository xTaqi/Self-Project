const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();
const messages = []; // In-memory storage for messages

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    logger.info(`Fetching messages for user: ${userId}`);
    const userMessages = messages.filter(msg => msg.to === userId);
    res.status(200).json(userMessages);
});

router.post('/', (req, res) => {
    const { from, to, body, date } = req.body;
    if (!from || !to || !body || !date) {
        logger.error('Invalid message payload');
        return res.status(400).json({ error: 'Invalid message payload' });
    }
    const newMessage = { id: messages.length + 1, from, to, body, date };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

router.delete('/:messageId', (req, res) => {
    const { messageId } = req.params;
    const index = messages.findIndex(msg => msg.id === parseInt(messageId));
    if (index === -1) {
        logger.error(`Message ${messageId} not found`);
        return res.status(404).json({ error: 'Message not found' });
    }
    const [deletedMessage] = messages.splice(index, 1);
    res.status(200).json(deletedMessage);
});

module.exports = router;
