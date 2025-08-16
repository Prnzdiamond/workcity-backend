const User = require('../models/user');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email role createdAt').sort({ name: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};