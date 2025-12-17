# MVCS Architecture - Quick Reference Card

## 🎯 Project Overview

**Student Management System** using **MVCS Architecture** with **Express.js**

**Project Location:** `c:\Users\HP\Desktop\Gradu`

---

## 📁 Core Files (Excluding node_modules)

```
Gradu/
├── src/
│   ├── controllers/StudentController.js    (HTTP handlers)
│   ├── services/StudentService.js          (Business logic)
│   ├── models/Student.js                   (Data structure)
│   ├── routes/studentRoutes.js             (Route mapping)
│   └── app.js                              (Server setup)
├── test.js                                 (Test demonstrations)
├── package.json                            (Dependencies)
└── Documentation files (.md)
```

---

## 🚀 Quick Commands

```bash
# Navigate to project
cd c:\Users\HP\Desktop\Gradu

# Install dependencies
npm install

# Run server (development with auto-reload)
npm run dev

# Run server (production)
npm start

# Run tests
node test.js
```

---

## 📚 Documentation Files

| File                   | Purpose                   | Read Time |
| ---------------------- | ------------------------- | --------- |
| **README.md**          | Project overview & setup  | 10 min    |
| **GETTING_STARTED.md** | Quick start guide         | 5 min     |
| **ARCHITECTURE.md**    | Detailed MVCS explanation | 20 min    |
| **API_GUIDE.md**       | API reference & examples  | 15 min    |
| **PROJECT_SUMMARY.md** | Structure & highlights    | 15 min    |

**Start with:** README.md → GETTING_STARTED.md → ARCHITECTURE.md

---

## 🏗️ MVCS Layers

### Layer 1: Route

**File:** [src/routes/studentRoutes.js](src/routes/studentRoutes.js)
**Purpose:** Map HTTP paths to controllers
**Code Size:** ~17 lines

```javascript
router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);
```

### Layer 2: Controller

**File:** [src/controllers/StudentController.js](src/controllers/StudentController.js)
**Purpose:** Handle HTTP requests/responses
**Code Size:** ~140 lines

```javascript
static createStudent(req, res) {
  // 1. Extract request data
  // 2. Validate HTTP concerns (required fields)
  // 3. Call service
  // 4. Format HTTP response
  // 5. Handle errors
}
```

**Key Principle:** No business logic, only HTTP concerns

### Layer 3: Service

**File:** [src/services/StudentService.js](src/services/StudentService.js)
**Purpose:** Implement business logic & validation
**Code Size:** ~185 lines

```javascript
// Business Logic Methods:
validateGPA(gpa);
calculateAge(dateOfBirth);
validateAge(dateOfBirth);
validateEmail(email);

// CRUD Operations:
createStudent(data);
getAllStudents();
getStudentById(id);
updateStudent(id, data);
deleteStudent(id);
getStatistics();
```

**Key Principle:** All business rules here, reusable

### Layer 4: Model

**File:** [src/models/Student.js](src/models/Student.js)
**Purpose:** Define data structure
**Code Size:** ~15 lines

```javascript
class Student {
  constructor(id, firstName, lastName, dateOfBirth, gpa, email)
}
```

**Key Principle:** Pure data, no logic, no HTTP

### Layer 5: Server

**File:** [src/app.js](src/app.js)
**Purpose:** Express server setup
**Code Size:** ~30 lines

---

## 📊 Request Flow

```
HTTP Request
    ↓
Route (studentRoutes.js)
    ↓ Maps to controller method
Controller (StudentController.js)
    ↓ Validates HTTP, calls service
Service (StudentService.js)
    ↓ Validates business rules
Model (Student.js)
    ↓ Data created/retrieved
In-Memory Store
    ↓
HTTP Response
```

---

## 🔄 CRUD Operations & Endpoints

| Operation      | Method | Endpoint                   | Handler            |
| -------------- | ------ | -------------------------- | ------------------ |
| **Create**     | POST   | `/api/students`            | `createStudent()`  |
| **Read (All)** | GET    | `/api/students`            | `getAllStudents()` |
| **Read (One)** | GET    | `/api/students/:id`        | `getStudentById()` |
| **Update**     | PUT    | `/api/students/:id`        | `updateStudent()`  |
| **Delete**     | DELETE | `/api/students/:id`        | `deleteStudent()`  |
| **Stats**      | GET    | `/api/students/statistics` | `getStatistics()`  |
| **Health**     | GET    | `/api/health`              | (built-in)         |

---

## ✅ Validation Rules

### GPA

- **Range:** 0 to 4.0
- **Type:** Number
- **Error:** "GPA must be between 0 and 4.0"
- **Location:** Service layer

### Date of Birth

- **Format:** YYYY-MM-DD
- **Type:** String (ISO 8601)
- **Rule:** Minimum 18 years old
- **Error:** "Student must be at least 18 years old"
- **Location:** Service layer

### Email

- **Format:** user@domain.extension
- **Type:** String
- **Regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Error:** "Invalid email format"
- **Location:** Service layer

### Names (firstName, lastName)

- **Type:** String
- **Required:** Yes
- **Error:** "Missing required fields"
- **Location:** Controller layer (HTTP validation)

---

## 💡 Example: Create Student Flow

### Request

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

### Layer-by-Layer Processing

**Route:** Maps to `StudentController.createStudent()`

**Controller:**

1. Extracts: `{ firstName, lastName, dateOfBirth, gpa, email }`
2. Validates: All fields present? ✓
3. Calls: `studentService.createStudent(...)`
4. Returns: `res.status(201).json(student)`

**Service:**

1. Validates: `validateGPA(3.8)` ✓ (0-4.0 range)
2. Validates: `validateAge('2005-06-15')` ✓ (18+ years)
3. Validates: `validateEmail('john@example.com')` ✓
4. Creates: `new Student(1, 'John', 'Doe', ...)`
5. Stores: `this.students.push(student)`
6. Returns: student object

**Model:**

- Student instance created with all properties

**Response (201 Created):**

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

---

## 🧪 Running Tests

```bash
node test.js
```

**Tests Included:**

1. ✅ Create valid student
2. ✅ Create another student
3. ✅ Get all students
4. ✅ Get student by ID
5. ✅ Update student
6. ✅ Get statistics
7. ✅ GPA validation (fail)
8. ✅ Age validation (fail)
9. ✅ Email validation (fail)
10. ✅ Delete student
11. ✅ Verify deletion
12. ✅ Error handling (404)

**All Tests Pass:** ✅

---

## 📝 File Responsibilities

### [src/models/Student.js](src/models/Student.js)

**Responsibility:** Data structure only

- No HTTP logic
- No business logic
- Just properties

### [src/services/StudentService.js](src/services/StudentService.js)

**Responsibility:** Business logic & CRUD

- All validations
- Age calculations
- Data operations
- Error handling for business rules

### [src/controllers/StudentController.js](src/controllers/StudentController.js)

**Responsibility:** HTTP request/response handling

- Parse requests
- Call services
- Format responses
- HTTP status codes

### [src/routes/studentRoutes.js](src/routes/studentRoutes.js)

**Responsibility:** Endpoint mapping

- POST /api/students
- GET /api/students
- GET /api/students/:id
- PUT /api/students/:id
- DELETE /api/students/:id
- GET /api/students/statistics

### [src/app.js](src/app.js)

**Responsibility:** Server initialization

- Express setup
- Middleware configuration
- Route mounting
- Error handlers
- Server startup

---

## 🎓 Key MVCS Principles

### ✅ Separation of Concerns

Each layer handles ONE thing:

- Route: HTTP routing
- Controller: HTTP I/O
- Service: Business logic
- Model: Data structure

### ✅ No Circular Dependencies

```
Route → Controller → Service → Model
No backwards calls
No circular references
```

### ✅ Reusability

Service methods can be called by:

- Multiple controllers
- Multiple routes
- Tests
- Other services
- Scheduled jobs

### ✅ Testability

Each layer tested independently:

- Controller: Mock Service
- Service: Mock Database
- Model: No mocking needed

### ✅ Scalability

Easy to add features:

- Add validation? Update Service
- Add endpoint? Add Route + Controller
- Change data? Update Model
- No cross-layer changes needed

---

## 🔍 Status Codes

| Code    | Meaning      | When                    | Example                |
| ------- | ------------ | ----------------------- | ---------------------- |
| **201** | Created      | POST succeeds           | Student created        |
| **200** | OK           | GET/PUT/DELETE succeeds | Data retrieved/updated |
| **400** | Bad Request  | Validation fails        | Invalid GPA            |
| **404** | Not Found    | Resource missing        | Student ID not found   |
| **500** | Server Error | Unexpected error        | Crash in code          |

---

## 🛠️ Extending the Project

### Add New Validation

**Location:** Service layer

```javascript
validateGrade(grade) {
  return ['A', 'B', 'C', 'D', 'F'].includes(grade);
}
```

### Add New CRUD Operation

**Files to modify:**

1. Route: Add endpoint
2. Controller: Add handler
3. Service: Add method
4. (Model: Only if new field)

### Add Database

**Files to modify:**

1. Service: Replace in-memory with DB calls
2. (Controller: Unchanged!)
3. (Model: Unchanged!)
4. (Route: Unchanged!)

---

## 📞 API Base URL

```
http://localhost:3000/api
```

### All Endpoints Start With

```
http://localhost:3000/api/students
```

### Examples

- Create: `POST http://localhost:3000/api/students`
- Get All: `GET http://localhost:3000/api/students`
- Get One: `GET http://localhost:3000/api/students/1`
- Update: `PUT http://localhost:3000/api/students/1`
- Delete: `DELETE http://localhost:3000/api/students/1`
- Stats: `GET http://localhost:3000/api/students/statistics`

---

## 💾 In-Memory Data Store

**Location:** StudentService singleton instance

```javascript
this.students = []; // Array storing all students
this.nextId = 1; // Auto-incrementing ID counter
```

**Note:** Data is lost when server restarts

**To Persist:** Connect to database in Service layer

---

## 🚨 Error Handling Flow

```
Service throws Error
    ↓
Controller catches in try-catch
    ↓
Controller formats error response
    ↓
Client receives JSON with error message
```

**Example:**

```javascript
// Service
throw new Error('GPA must be between 0 and 4.0');

// Controller catches
catch (error) {
  return res.status(400).json({ error: error.message });
}

// Client receives
{
  "error": "GPA must be between 0 and 4.0"
}
```

---

## 📖 Reading Order

For complete understanding, read in this order:

1. **README.md** (10 min) - Get overview
2. **GETTING_STARTED.md** (5 min) - Run the project
3. **ARCHITECTURE.md** (20 min) - Understand the flow
4. **PROJECT_SUMMARY.md** (15 min) - See structure details
5. **API_GUIDE.md** (15 min) - Learn all endpoints

**Total:** ~65 minutes to full understanding

---

## ✨ What Makes This Project Special

✨ **Complete MVCS Implementation**

- Every principle followed strictly
- Clear layer separation
- Professional structure

✨ **Comprehensive Documentation**

- 5 detailed markdown files
- Diagrams and examples
- Multiple entry points

✨ **Production-Ready Code**

- Error handling
- Input validation
- Clean architecture

✨ **Easy to Extend**

- Add database in one layer
- Add features without modifying others
- Scalable structure

✨ **Well-Tested**

- 12 test scenarios included
- All CRUD operations verified
- Validation rules confirmed

---

## 🎉 Ready to Go!

**Start here:** `npm start`

**Learn more:** Read `README.md`

**Understand architecture:** Read `ARCHITECTURE.md`

**Reference API:** Use `API_GUIDE.md`

**Happy coding! 🚀**

---

**Created:** December 17, 2025
**Project:** Student Management System - MVCS Architecture
**Framework:** Express.js with Node.js
**Status:** Complete & Production-Ready ✅
