import Message from "../models/Message.js";

// 1. GET all messages (for administrative use)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ success: false, message: "Server error retrieving messages." });
  }
};

// 2. CREATE a message (used by the Contact Form)
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, telegram, message } = req.body;

    // --- Server-Side Validation (Requirement 6.4) ---
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: "Name must be at least 2 characters." });
    }
    // Simple Email Regex
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }
    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({ success: false, message: "Subject must be at least 3 characters." });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: "Message must be at least 10 characters." });
    }

    // --- Save to MongoDB (Requirement 7) ---
    const newMessage = await Message.create({
      name,
      email,
      subject,
      telegram, 
      message
    });

    res.status(201).json({ 
      success: true, 
      data: newMessage, 
      message: "Message submitted successfully. Thank you!" 
    });
  } catch (error) {
    console.error("Error submitting message:", error);
    res.status(500).json({ success: false, message: "Server error submitting the message." });
  }
};