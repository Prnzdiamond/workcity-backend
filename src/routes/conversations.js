const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const conversationController = require('../controllers/conversationController');

router.use(auth); // Protect all conversation routes

router.post('/', conversationController.createConversation);
router.get('/', conversationController.getConversations);
router.get('/:id', conversationController.getConversation);

module.exports = router;