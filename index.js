const express = require('express');
const logger = require('./utils/logger');
const messagesRouter = require('./routers/messages');
const usersRouter = require('./routers/users');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json()); // Parse JSON in request bodies

// Routers
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.post('/test', (req, res) => {
    res.status(200).send('Test route working!');
});


// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
