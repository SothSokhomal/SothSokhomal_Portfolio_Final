import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, required: true, trim: true },
  problem: { type: String, required: true, trim: true },
  technologies: { type: [String], default: [] },
  imageUrl: { type: String, trim: true },
  github: { type: String, trim: true },
  live: { type: String, trim: true },
  contribution: { type: String, trim: true },
  challenges: { type: String, trim: true },
  lessons: { type: String, trim: true },
  features: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", ProjectSchema);
