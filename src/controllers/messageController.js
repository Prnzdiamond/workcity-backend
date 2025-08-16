const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.createMessage = async (req, res) => {
    try {
        const { conversationId, content } = req.body;
        const senderId = req.user.id;

        // Verify user is part of conversation
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: senderId
        });

        if (!conversation) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Create message
        const message = await Message.create({
            conversation: conversationId,
            sender: senderId,
            content,
            readBy: [senderId]
        });

        // Update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: content,
            lastMessageTime: new Date()
        });

        // Populate sender info
        const populatedMessage = await message.populate('sender', 'name email role');

        // Emit to Socket.IO room
        const io = req.app.get('io');
        if (io) {
            io.to(conversationId).emit('new_message', populatedMessage);
        }

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        // Verify user is part of conversation
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const messages = await Message.find({ conversation: conversationId })
            .populate('sender', 'name email role')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user.id;

        const message = await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { readBy: userId } },
            { new: true }
        ).populate('sender', 'name email role');

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};