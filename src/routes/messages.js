const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const messageController = require('../controllers/messageController');

router.use(auth); // Protect all message routes

router.post('/', messageController.createMessage);
router.get('/:conversationId', messageController.getMessages);
router.patch('/:messageId/read', messageController.markAsRead);

module.exports = router;