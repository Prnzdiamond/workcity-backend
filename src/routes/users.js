const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.use(auth);
router.get('/', userController.getUsers);

module.exports = router;