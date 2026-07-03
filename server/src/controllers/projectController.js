import Project from "../models/Project.js";

export async function getProjects(req, res) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error retrieving projects." });
  }
}

export async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid project ID." });
    }
    res.status(500).json({ success: false, message: "Server error retrieving the project." });
  }
}

export async function createProject(req, res) {
  try {
    const { title, description, problem, technologies } = req.body;
    if (!title || title.length < 3) {
      return res.status(400).json({ success: false, message: "Title is required and must be at least 3 characters." });
    }
    if (!description || description.length < 10) {
      return res.status(400).json({ success: false, message: "Description is required and must be at least 10 characters." });
    }
    if (!problem || problem.length < 10) {
      return res.status(400).json({ success: false, message: "Problem is required and must be at least 10 characters." });
    }

    const project = await Project.create({ ...req.body });
    res.status(201).json({ success: true, data: project, message: "Project created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error creating the project." });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({ success: true, data: project, message: "Project updated successfully." });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid project ID." });
    }
    res.status(500).json({ success: false, message: "Server error updating the project." });
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid project ID." });
    }
    res.status(500).json({ success: false, message: "Server error deleting the project." });
  }
}
