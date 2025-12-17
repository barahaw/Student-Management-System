// Service: Contains all business logic and validation rules
// Responsibility: Business logic, validation, calculations (GPA, age)
// Acts as intermediate layer between Controller and Model

import { Student } from "../models/Student.js";

export class StudentService {
  constructor() {
    // In-memory data store
    this.students = [];
    this.nextId = 1;
  }

  // Business Logic: Validate GPA (must be between 0 and 4.0)
  validateGPA(gpa) {
    return gpa >= 0 && gpa <= 4.0;
  }

  // Business Logic: Calculate age from date of birth
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  // Business Logic: Validate age (must be at least 18)
  validateAge(dateOfBirth) {
    const age = this.calculateAge(dateOfBirth);
    return age >= 18;
  }

  // Business Logic: Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Business Logic: Create student with validations
  createStudent(firstName, lastName, dateOfBirth, gpa, email) {
    // Validate GPA
    if (!this.validateGPA(gpa)) {
      throw new Error("GPA must be between 0 and 4.0");
    }

    // Validate age
    if (!this.validateAge(dateOfBirth)) {
      throw new Error("Student must be at least 18 years old");
    }

    // Validate email
    if (!this.validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    const student = new Student(
      this.nextId++,
      firstName,
      lastName,
      dateOfBirth,
      gpa,
      email
    );

    this.students.push(student);
    return student;
  }

  // Business Logic: Get all students
  getAllStudents() {
    return this.students;
  }

  // Business Logic: Get student by ID
  getStudentById(id) {
    return this.students.find((student) => student.id === id);
  }

  // Business Logic: Update student with validations
  updateStudent(id, updateData) {
    const student = this.getStudentById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    // Validate GPA if provided
    if (updateData.gpa !== undefined && !this.validateGPA(updateData.gpa)) {
      throw new Error("GPA must be between 0 and 4.0");
    }

    // Validate age if date of birth is being updated
    if (
      updateData.dateOfBirth !== undefined &&
      !this.validateAge(updateData.dateOfBirth)
    ) {
      throw new Error("Student must be at least 18 years old");
    }

    // Validate email if provided
    if (
      updateData.email !== undefined &&
      !this.validateEmail(updateData.email)
    ) {
      throw new Error("Invalid email format");
    }

    // Update fields
    if (updateData.firstName !== undefined)
      student.firstName = updateData.firstName;
    if (updateData.lastName !== undefined)
      student.lastName = updateData.lastName;
    if (updateData.dateOfBirth !== undefined)
      student.dateOfBirth = updateData.dateOfBirth;
    if (updateData.gpa !== undefined) student.gpa = updateData.gpa;
    if (updateData.email !== undefined) student.email = updateData.email;

    student.updatedAt = new Date();

    return student;
  }

  // Business Logic: Delete student
  deleteStudent(id) {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new Error("Student not found");
    }

    const deletedStudent = this.students.splice(index, 1);
    return deletedStudent[0];
  }

  // Business Logic: Get student statistics
  getStatistics() {
    if (this.students.length === 0) {
      return {
        totalStudents: 0,
        averageGPA: 0,
        highestGPA: 0,
        lowestGPA: 0,
      };
    }

    const gpas = this.students.map((s) => s.gpa);
    const averageGPA = gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length;

    return {
      totalStudents: this.students.length,
      averageGPA: parseFloat(averageGPA.toFixed(2)),
      highestGPA: Math.max(...gpas),
      lowestGPA: Math.min(...gpas),
    };
  }
}

// Create singleton instance
export const studentService = new StudentService();
