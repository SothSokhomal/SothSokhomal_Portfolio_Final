// import express from "express";
// import { createMessage, getMessages } from "../controllers/messageController.js";

// const router = express.Router();

// // POST /api/messages -> This is what your React form calls
// router.post("/", createMessage); 

// // GET /api/messages -> This allows you to see the messages
// router.get("/", getMessages);    

// export default router;


// import Message from "../models/Message.js";

// export const createMessage = async (req, res) => {
//   try {
//     const newMessage = new Message(req.body);
//     await newMessage.save();
//     res.status(201).json({ success: true, message: "Message sent to MongoDB!" });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default router;

import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

// THIS LINE WAS LIKELY MISSING:
const router = express.Router();

router.post("/", createMessage); 
router.get("/", getMessages);    

export default router;