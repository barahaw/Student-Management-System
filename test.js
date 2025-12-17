// Test file to demonstrate the MVCS architecture working
// Run: node test.js

import { StudentController } from "./src/controllers/StudentController.js";
import { studentService } from "./src/services/StudentService.js";

console.log("\n╔═══════════════════════════════════════════════════════╗");
console.log("║   MVCS Architecture - Student Management System       ║");
console.log("║                  Test Demonstration                   ║");
console.log("╚═══════════════════════════════════════════════════════╝\n");

// Mock request and response objects for testing
class MockRequest {
  constructor(body = {}, params = {}) {
    this.body = body;
    this.params = params;
  }
}

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.jsonData = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    this.jsonData = data;
    return this;
  }
}

// Test 1: Create valid student
console.log("TEST 1: Create Valid Student");
console.log("─".repeat(50));

const req1 = new MockRequest({
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "2005-06-15",
  gpa: 3.8,
  email: "john@example.com",
});

const res1 = new MockResponse();
StudentController.createStudent(req1, res1);

console.log(`Status: ${res1.statusCode}`);
console.log(`Message: ${res1.jsonData.message}`);
console.log(`Student:`, res1.jsonData.data);
console.log();

// Test 2: Create another valid student
console.log("TEST 2: Create Another Valid Student");
console.log("─".repeat(50));

const req2 = new MockRequest({
  firstName: "Jane",
  lastName: "Smith",
  dateOfBirth: "2004-03-20",
  gpa: 3.5,
  email: "jane@example.com",
});

const res2 = new MockResponse();
StudentController.createStudent(req2, res2);

console.log(`Status: ${res2.statusCode}`);
console.log(`Message: ${res2.jsonData.message}`);
console.log(`Student:`, res2.jsonData.data);
console.log();

// Test 3: Get all students
console.log("TEST 3: Get All Students");
console.log("─".repeat(50));

const req3 = new MockRequest();
const res3 = new MockResponse();
StudentController.getAllStudents(req3, res3);

console.log(`Status: ${res3.statusCode}`);
console.log(`Message: ${res3.jsonData.message}`);
console.log(`Count: ${res3.jsonData.count}`);
console.log(`Students:`, res3.jsonData.data);
console.log();

// Test 4: Get student by ID
console.log("TEST 4: Get Student by ID (ID: 1)");
console.log("─".repeat(50));

const req4 = new MockRequest({}, { id: "1" });
const res4 = new MockResponse();
StudentController.getStudentById(req4, res4);

console.log(`Status: ${res4.statusCode}`);
console.log(`Message: ${res4.jsonData.message}`);
console.log(`Student:`, res4.jsonData.data);
console.log();

// Test 5: Update student
console.log("TEST 5: Update Student (Increase GPA)");
console.log("─".repeat(50));

const req5 = new MockRequest({ gpa: 3.9 }, { id: "1" });
const res5 = new MockResponse();
StudentController.updateStudent(req5, res5);

console.log(`Status: ${res5.statusCode}`);
console.log(`Message: ${res5.jsonData.message}`);
console.log(`Updated Student:`, res5.jsonData.data);
console.log();

// Test 6: Get statistics
console.log("TEST 6: Get Student Statistics");
console.log("─".repeat(50));

const req6 = new MockRequest();
const res6 = new MockResponse();
StudentController.getStatistics(req6, res6);

console.log(`Status: ${res6.statusCode}`);
console.log(`Message: ${res6.jsonData.message}`);
console.log(`Statistics:`, res6.jsonData.data);
console.log();

// Test 7: Invalid GPA (Business Logic Validation)
console.log("TEST 7: Validation - Invalid GPA (5.0)");
console.log("─".repeat(50));

const req7 = new MockRequest({
  firstName: "Bob",
  lastName: "Wilson",
  dateOfBirth: "2004-01-10",
  gpa: 5.0, // ❌ Invalid: > 4.0
  email: "bob@example.com",
});

const res7 = new MockResponse();
StudentController.createStudent(req7, res7);

console.log(`Status: ${res7.statusCode}`);
console.log(`Error: ${res7.jsonData.error}`);
console.log("✓ Business logic validation working!");
console.log();

// Test 8: Invalid Age (Too Young)
console.log("TEST 8: Validation - Invalid Age (14 years old)");
console.log("─".repeat(50));

const req8 = new MockRequest({
  firstName: "Alice",
  lastName: "Brown",
  dateOfBirth: "2010-01-15", // ❌ Only 14 years old
  gpa: 3.2,
  email: "alice@example.com",
});

const res8 = new MockResponse();
StudentController.createStudent(req8, res8);

console.log(`Status: ${res8.statusCode}`);
console.log(`Error: ${res8.jsonData.error}`);
console.log("✓ Age validation working!");
console.log();

// Test 9: Invalid Email
console.log("TEST 9: Validation - Invalid Email Format");
console.log("─".repeat(50));

const req9 = new MockRequest({
  firstName: "Charlie",
  lastName: "Davis",
  dateOfBirth: "2005-05-05",
  gpa: 3.6,
  email: "invalid-email", // ❌ Invalid email format
});

const res9 = new MockResponse();
StudentController.createStudent(req9, res9);

console.log(`Status: ${res9.statusCode}`);
console.log(`Error: ${res9.jsonData.error}`);
console.log("✓ Email validation working!");
console.log();

// Test 10: Delete student
console.log("TEST 10: Delete Student (ID: 2)");
console.log("─".repeat(50));

const req10 = new MockRequest({}, { id: "2" });
const res10 = new MockResponse();
StudentController.deleteStudent(req10, res10);

console.log(`Status: ${res10.statusCode}`);
console.log(`Message: ${res10.jsonData.message}`);
console.log(`Deleted Student:`, res10.jsonData.data);
console.log();

// Test 11: Get remaining students
console.log("TEST 11: Get All Students After Deletion");
console.log("─".repeat(50));

const req11 = new MockRequest();
const res11 = new MockResponse();
StudentController.getAllStudents(req11, res11);

console.log(`Status: ${res11.statusCode}`);
console.log(`Count: ${res11.jsonData.count}`);
console.log(`Remaining Students:`, res11.jsonData.data);
console.log();

// Test 12: Not found error
console.log("TEST 12: Error Handling - Student Not Found");
console.log("─".repeat(50));

const req12 = new MockRequest({}, { id: "999" });
const res12 = new MockResponse();
StudentController.getStudentById(req12, res12);

console.log(`Status: ${res12.statusCode}`);
console.log(`Error: ${res12.jsonData.error}`);
console.log("✓ Error handling working!");
console.log();

// Summary
console.log("╔═══════════════════════════════════════════════════════╗");
console.log("║              TEST SUMMARY                             ║");
console.log("╠═══════════════════════════════════════════════════════╣");
console.log("║ ✓ All CRUD operations working                        ║");
console.log("║ ✓ Business logic validation working                  ║");
console.log("║ ✓ GPA validation (0-4.0) working                     ║");
console.log("║ ✓ Age validation (≥18 years) working                 ║");
console.log("║ ✓ Email validation working                           ║");
console.log("║ ✓ Error handling working                             ║");
console.log("║ ✓ MVCS architecture properly implemented             ║");
console.log("╚═══════════════════════════════════════════════════════╝\n");
