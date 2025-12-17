// Routes: Connect Express routes to controllers
// Responsibility: Map HTTP methods and paths to controller methods

import express from "express";
import { StudentController } from "../controllers/StudentController.js";

const router = express.Router();

// POST /api/students - Create a new student
router.post("/", StudentController.createStudent);

// GET /api/students - Get all students
router.get("/", StudentController.getAllStudents);

// GET /api/students/statistics - Get student statistics
router.get("/statistics", StudentController.getStatistics);

// GET /api/students/:id - Get student by ID
router.get("/:id", StudentController.getStudentById);

// PUT /api/students/:id - Update student
router.put("/:id", StudentController.updateStudent);

// DELETE /api/students/:id - Delete student
router.delete("/:id", StudentController.deleteStudent);

export default router;
