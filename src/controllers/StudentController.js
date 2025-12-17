// Controller: Handles HTTP concerns only (request, response, status codes)
// Responsibility: Parse requests, call service, format responses
// NO business logic - all logic delegated to Service layer

import { studentService } from "../services/StudentService.js";

export class StudentController {
  // HTTP Handler: Create a new student
  static createStudent(req, res) {
    try {
      const { firstName, lastName, dateOfBirth, gpa, email } = req.body;

      // Validate required fields are present (HTTP validation)
      if (
        !firstName ||
        !lastName ||
        !dateOfBirth ||
        gpa === undefined ||
        !email
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: firstName, lastName, dateOfBirth, gpa, email",
        });
      }

      // Call service for business logic
      const student = studentService.createStudent(
        firstName,
        lastName,
        dateOfBirth,
        gpa,
        email
      );

      // Return response with appropriate status code
      return res.status(201).json({
        message: "Student created successfully",
        data: student,
      });
    } catch (error) {
      // Handle errors from service layer
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  // HTTP Handler: Get all students
  static getAllStudents(req, res) {
    try {
      const students = studentService.getAllStudents();

      return res.status(200).json({
        message: "Students retrieved successfully",
        data: students,
        count: students.length,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // HTTP Handler: Get student by ID
  static getStudentById(req, res) {
    try {
      const { id } = req.params;

      // Validate ID parameter is a number
      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid student ID format",
        });
      }

      const student = studentService.getStudentById(parseInt(id));

      if (!student) {
        return res.status(404).json({
          error: "Student not found",
        });
      }

      return res.status(200).json({
        message: "Student retrieved successfully",
        data: student,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // HTTP Handler: Update student
  static updateStudent(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate ID parameter is a number
      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid student ID format",
        });
      }

      // Validate at least one field is provided for update
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          error: "At least one field must be provided for update",
        });
      }

      // Call service for business logic
      const student = studentService.updateStudent(parseInt(id), updateData);

      return res.status(200).json({
        message: "Student updated successfully",
        data: student,
      });
    } catch (error) {
      if (error.message === "Student not found") {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(400).json({
        error: error.message,
      });
    }
  }

  // HTTP Handler: Delete student
  static deleteStudent(req, res) {
    try {
      const { id } = req.params;

      // Validate ID parameter is a number
      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid student ID format",
        });
      }

      const student = studentService.deleteStudent(parseInt(id));

      return res.status(200).json({
        message: "Student deleted successfully",
        data: student,
      });
    } catch (error) {
      if (error.message === "Student not found") {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // HTTP Handler: Get student statistics
  static getStatistics(req, res) {
    try {
      const statistics = studentService.getStatistics();

      return res.status(200).json({
        message: "Statistics retrieved successfully",
        data: statistics,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
