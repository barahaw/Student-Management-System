# API Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 3. Test with cURL or Postman

---

## API Endpoints

### 1. Create Student

**Endpoint:** `POST /api/students`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2005-06-15",
  "gpa": 3.8,
  "email": "john@example.com"
}
```

**Success Response (201):**

```json
{
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john@example.com",
    "createdAt": "2025-12-17T15:20:40.610Z",
    "updatedAt": "2025-12-17T15:20:40.610Z"
  }
}
```

**Error Response (400):**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john@example.com"
  }'
```

---

### 2. Get All Students

**Endpoint:** `GET /api/students`

**Response (200):**

```json
{
  "message": "Students retrieved successfully",
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "2005-06-15",
      "gpa": 3.8,
      "email": "john@example.com",
      "createdAt": "2025-12-17T15:20:40.610Z",
      "updatedAt": "2025-12-17T15:20:40.610Z"
    }
  ],
  "count": 1
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/students
```

---

### 3. Get Student by ID

**Endpoint:** `GET /api/students/:id`

**URL Parameter:**

- `id` (required): Student ID (number)

**Response (200):**

```json
{
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john@example.com",
    "createdAt": "2025-12-17T15:20:40.610Z",
    "updatedAt": "2025-12-17T15:20:40.610Z"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Student not found"
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/students/1
```

---

### 4. Update Student

**Endpoint:** `PUT /api/students/:id`

**URL Parameter:**

- `id` (required): Student ID (number)

**Request Body:** (any combination of fields)

```json
{
  "firstName": "Jonathan",
  "gpa": 3.9,
  "email": "jonathan@example.com"
}
```

**Response (200):**

```json
{
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "firstName": "Jonathan",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.9,
    "email": "jonathan@example.com",
    "createdAt": "2025-12-17T15:20:40.610Z",
    "updatedAt": "2025-12-17T15:20:40.615Z"
  }
}
```

**Error Response (400 - Invalid GPA):**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

**Error Response (404 - Not Found):**

```json
{
  "error": "Student not found"
}
```

**cURL Example:**

```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 3.9,
    "email": "jonathan@example.com"
  }'
```

---

### 5. Delete Student

**Endpoint:** `DELETE /api/students/:id`

**URL Parameter:**

- `id` (required): Student ID (number)

**Response (200):**

```json
{
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john@example.com",
    "createdAt": "2025-12-17T15:20:40.610Z",
    "updatedAt": "2025-12-17T15:20:40.610Z"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Student not found"
}
```

**cURL Example:**

```bash
curl -X DELETE http://localhost:3000/api/students/1
```

---

### 6. Get Statistics

**Endpoint:** `GET /api/students/statistics`

**Response (200):**

```json
{
  "message": "Statistics retrieved successfully",
  "data": {
    "totalStudents": 5,
    "averageGPA": 3.76,
    "highestGPA": 4.0,
    "lowestGPA": 3.2
  }
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/students/statistics
```

---

### 7. Health Check

**Endpoint:** `GET /api/health`

**Response (200):**

```json
{
  "message": "Server is running",
  "timestamp": "2025-12-17T15:20:40.610Z"
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/health
```

---

## Validation Rules

### GPA Validation

- **Range:** 0 to 4.0 (inclusive)
- **Type:** Number
- **Error Message:** "GPA must be between 0 and 4.0"

**Valid Examples:**

```json
{ "gpa": 0 }
{ "gpa": 2.5 }
{ "gpa": 4.0 }
{ "gpa": 3.75 }
```

**Invalid Examples:**

```json
{ "gpa": -0.5 }      // ❌ Too low
{ "gpa": 5.0 }       // ❌ Too high
{ "gpa": "3.5" }     // ❌ Must be number
```

---

### Age Validation

- **Minimum Age:** 18 years old
- **Calculated From:** `dateOfBirth` (ISO 8601 format)
- **Format:** `YYYY-MM-DD`
- **Error Message:** "Student must be at least 18 years old"

**Valid Examples:**

```json
{ "dateOfBirth": "2005-06-15" }    // Currently 19 years old
{ "dateOfBirth": "2007-01-01" }    // Currently 18 years old
{ "dateOfBirth": "1990-12-25" }    // Currently 34 years old
```

**Invalid Examples:**

```json
{ "dateOfBirth": "2010-01-15" }    // ❌ Only 14 years old
{ "dateOfBirth": "2008-06-15" }    // ❌ Only 16 years old
{ "dateOfBirth": "2007-12-20" }    // ❌ Not yet 18
```

---

### Email Validation

- **Format:** Must contain `@` and `.`
- **Pattern:** `user@domain.extension`
- **Error Message:** "Invalid email format"

**Valid Examples:**

```json
{ "email": "john@example.com" }
{ "email": "student.name@university.ac.uk" }
{ "email": "user+tag@domain.org" }
```

**Invalid Examples:**

```json
{ "email": "invalid-email" }              // ❌ No @
{ "email": "user@domain" }                // ❌ No extension
{ "email": "@example.com" }               // ❌ No username
{ "email": "user@.com" }                  // ❌ No domain
```

---

## HTTP Status Codes

| Status  | Meaning      | Example                         |
| ------- | ------------ | ------------------------------- |
| **201** | Created      | New student created             |
| **200** | OK           | Successful GET, PUT, DELETE     |
| **400** | Bad Request  | Validation error, missing field |
| **404** | Not Found    | Student ID doesn't exist        |
| **500** | Server Error | Unexpected error                |

---

## Complete Workflow Example

```bash
# 1. Create first student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "dateOfBirth": "2004-09-12",
    "gpa": 3.6,
    "email": "alice@example.com"
  }'
# Response: ID 1 created

# 2. Create second student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Smith",
    "dateOfBirth": "2005-11-03",
    "gpa": 3.4,
    "email": "bob@example.com"
  }'
# Response: ID 2 created

# 3. Get all students
curl http://localhost:3000/api/students
# Response: Array of 2 students

# 4. Get statistics
curl http://localhost:3000/api/students/statistics
# Response: { totalStudents: 2, averageGPA: 3.5, ... }

# 5. Update Alice's GPA
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{ "gpa": 3.8 }'
# Response: Updated student with new GPA

# 6. Get updated statistics
curl http://localhost:3000/api/students/statistics
# Response: { totalStudents: 2, averageGPA: 3.6, ... }

# 7. Delete Bob
curl -X DELETE http://localhost:3000/api/students/2
# Response: Deleted student data

# 8. Verify deletion
curl http://localhost:3000/api/students
# Response: Array of 1 student (only Alice)
```

---

## Testing with Postman

### Import Collection

1. Create new POST request
2. URL: `http://localhost:3000/api/students`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "firstName": "Test",
  "lastName": "User",
  "dateOfBirth": "2005-01-15",
  "gpa": 3.5,
  "email": "test@example.com"
}
```

### Create Environment Variables

For easier testing:

```
BASE_URL = http://localhost:3000
API_PATH = /api/students
```

Then use:

```
{{BASE_URL}}{{API_PATH}}
```

---

## Error Handling Examples

### Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"firstName": "John"}'
```

**Response (400):**

```json
{
  "error": "Missing required fields: firstName, lastName, dateOfBirth, gpa, email"
}
```

---

### Invalid GPA

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 5.5,
    "email": "john@example.com"
  }'
```

**Response (400):**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

---

### Student Not Found

```bash
curl http://localhost:3000/api/students/999
```

**Response (404):**

```json
{
  "error": "Student not found"
}
```

---

### Invalid ID Format

```bash
curl http://localhost:3000/api/students/abc
```

**Response (400):**

```json
{
  "error": "Invalid student ID format"
}
```

---

## Rate Limiting & Best Practices

### Recommendations

1. **Batch Operations:** Create multiple students in succession
2. **Pagination:** For large datasets, consider adding pagination
3. **Caching:** Cache frequently accessed students
4. **Error Recovery:** Handle errors gracefully in client code
5. **Validation:** Always validate input before sending requests

### Example Client Code (Node.js)

```javascript
import axios from "axios";

const API_URL = "http://localhost:3000/api/students";

async function createStudent(studentData) {
  try {
    const response = await axios.post(API_URL, studentData);
    console.log("Student created:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating student:", error.response.data.error);
  }
}

async function getAllStudents() {
  try {
    const response = await axios.get(API_URL);
    console.log("Students:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching students:", error.response.data.error);
  }
}

// Usage
createStudent({
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "2005-06-15",
  gpa: 3.8,
  email: "john@example.com",
});
```

---

**End of API Usage Guide**
