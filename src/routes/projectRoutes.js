import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  assignProject,
} from "../controllers/projectController.js";
import { runUITestForProject } from "../controllers/projectController.js";
import { runAPITestsForProject } from "../controllers/projectController.js";
import { runPerformanceTestsForProject } from "../controllers/projectController.js";
import { getReleaseConfidence } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/:id/assign", assignProject);
router.post("/:id/run-ui-tests", runUITestForProject);
router.post("/:id/run-api-tests", runAPITestsForProject);
router.post("/:id/run-performance-tests", runPerformanceTestsForProject);
router.get("/:id/release-confidence", getReleaseConfidence);



export default router;
