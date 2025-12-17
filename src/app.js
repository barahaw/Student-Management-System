// Main application file
// Sets up Express server and mounts routes

import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: Parse JSON request bodies
app.use(express.json());

// Middleware: Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes: Mount student routes at /api/students
app.use("/api/students", studentRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║   Student Management System - MVCS Architecture    ║
║                                                    ║
║   Server running on: http://localhost:${PORT}        ║
║                                                    ║
║   API Endpoints:                                   ║
║   POST   /api/students              - Create      ║
║   GET    /api/students              - Get all     ║
║   GET    /api/students/:id          - Get one     ║
║   PUT    /api/students/:id          - Update      ║
║   DELETE /api/students/:id          - Delete      ║
║   GET    /api/students/statistics   - Stats       ║
║                                                    ║
║   Health: GET /api/health                         ║
╚════════════════════════════════════════════════════╝
  `);
});
