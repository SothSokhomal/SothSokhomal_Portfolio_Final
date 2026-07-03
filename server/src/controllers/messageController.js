import Message from "../models/Message.js";

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error retrieving messages." });
  }
}

export async function createMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: "Name is required and must be at least 2 characters." });
    }
    if (!email || !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
      return res.status(400).json({ sucess: false, message: "A valid email address is required." });
    }
    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({ success: false, message: "Subject is required and must be at least 3 characters." });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: "Message is required and must be at least 10 characters." });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: newMessage, message: "Message submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error submitting the message." });
  }
}
