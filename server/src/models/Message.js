import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
  subject: { type: String, required: true, trim: true, minlength: 3 },
  telegram: { type: String, trim: true, default: "" },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
