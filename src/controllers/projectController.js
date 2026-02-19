import Project from "../models/Project.js";
import { runUITests } from "../services/uiTestRunner.js";
import { runAPITests } from "../services/apiTestRunner.js";
import { runPerformanceTests } from "../services/performanceRunner.js";
import { calculateReleaseConfidence } from "../services/confidenceEngine.js";


// Create Project
export const createProject = async (req, res) => {
  try {
    const { name, baseUrl, modules, criticalEndpoints } = req.body;

    const project = await Project.create({
      name,
      baseUrl,
      modules,
      criticalEndpoints,
      createdBy: req.user?.id, // later from auth middleware
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email role");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role");

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Project to Tester
export const assignProject = async (req, res) => {
  try {
    const { testerId } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.assignedTo = testerId;
    project.status = "Assigned";

    await project.save();

    res.json({
      message: "Project assigned to tester",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Run UI Tests
export const runUITestForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    project.status = "Testing";
    await project.save();

    const runnerResponse = await runUITests(project.baseUrl);

    // Use summary returned by runner
    const summary = runnerResponse.summary || runnerResponse;

    project.results.ui = summary;
    await project.save();

    res.json({
      message: "UI tests executed",
      results: summary,
    });
  } catch (error) {
    console.error("UI Test Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Run API Tests
export const runAPITestsForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.status = "Testing";
    await project.save();

    const apiBase = project.apiBaseUrl || project.baseUrl;

const results = await runAPITests(
  apiBase,
  project.criticalEndpoints
);


    project.results.api = results;
    await project.save();

    res.json({
      message: "API tests executed",
      results,
    });
  } catch (error) {
    console.error("API Test Error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const runPerformanceTestsForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    const results = await runPerformanceTests(project.baseUrl);

    project.results.performance = results;
    await project.save();

    res.json({
      message: "Performance tests executed",
      results,
    });
  } catch (error) {
    console.error("Performance Test Error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getReleaseConfidence = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    const score = calculateReleaseConfidence(project.results);

    project.releaseConfidence = score;
    await project.save();

    res.json({
      message: "Release confidence calculated",
      score,
    });
  } catch (error) {
    console.error("Confidence Engine Error:", error);
    res.status(500).json({ message: error.message });
  }
};
