const Conversation = require('../models/Conversation');
const User = require('../models/user');

exports.createConversation = async (req, res) => {
    try {
        const { participantIds } = req.body;
        const currentUserId = req.user.id;

        // Add current user to participants if not included
        const allParticipants = [...new Set([currentUserId, ...participantIds])];

        if (allParticipants.length < 2) {
            return res.status(400).json({ message: 'At least 2 participants required' });
        }

        // Check if conversation already exists
        const existingConversation = await Conversation.findOne({
            participants: { $all: allParticipants, $size: allParticipants.length }
        });

        if (existingConversation) {
            const populated = await existingConversation.populate('participants', 'name email role');
            return res.json(populated);
        }

        // Create new conversation
        const conversation = await Conversation.create({
            participants: allParticipants
        });

        const populated = await conversation.populate('participants', 'name email role');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId
        })
            .populate('participants', 'name email role')
            .sort({ lastMessageTime: -1 });

        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const conversation = await Conversation.findOne({
            _id: id,
            participants: userId
        }).populate('participants', 'name email role');

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};