# Workcity Chat Backend

Real-time chat system backend for eCommerce platform communication.

## Tech Stack
- Node.js & Express
- MongoDB & Mongoose 
- Socket.IO for real-time messaging
- JWT authentication
- bcrypt for password hashing

## Features
- User authentication (register/login)
- User roles: admin, agent, customer, designer, merchant
- Real-time messaging with Socket.IO
- Conversation management
- Message read/unread status
- Online user tracking

## Setup

1. Clone and install:
```bash
git clone <repo-url>
cd workcity-backend
npm install
```

2. Create `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/workcity-chat
JWT_SECRET=your-secret-key
CLIENT_ORIGIN=http://localhost:3000
```

3. Start server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users  
- `GET /api/users` - Get all users

### Conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations` - Get user conversations

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get messages

## Socket Events
- `user_online` - User status
- `join_conversation` - Join chat room
- `new_message` - Real-time message
- `typing` - Typing indicator

## Challenges
- Setting up Socket.IO rooms properly
- Managing user sessions and authentication
- Handling message read status efficiently
- Real-time updates without performance issues

The trickiest part was getting Socket.IO to work smoothly with JWT auth and making sure messages sync properly across multiple users.