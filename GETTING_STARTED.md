# GETTING STARTED GUIDE

## 🚀 Quick Start (2 Minutes)

### Step 1: Navigate to Project

```bash
cd c:\Users\HP\Desktop\Gradu
```

### Step 2: Start the Server

```bash
npm start
```

You should see:

```
╔════════════════════════════════════════════════════╗
║   Student Management System - MVCS Architecture    ║
║                                                    ║
║   Server running on: http://localhost:3000        ║
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
```

### Step 3: Test the API (Open New Terminal)

```bash
# Health check
curl http://localhost:3000/api/health

# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john@example.com"
  }'

# Get all students
curl http://localhost:3000/api/students
```

---

## 📚 Documentation Files

### 1. **README.md** - Start here!

Main project documentation with:

- Architecture overview
- Features list
- Installation instructions
- API endpoint descriptions
- Request/response examples
- Error handling guide

### 2. **ARCHITECTURE.md** - Deep dive

Detailed explanation with:

- Complete request flow with code examples
- Error handling flow
- MVCS principles explained
- Data flow diagrams
- All 6 CRUD operations explained
- Validation layers breakdown
- Why this architecture matters

### 3. **API_GUIDE.md** - Reference

Complete API documentation with:

- All endpoint descriptions
- Request/response examples
- Status codes explanation
- Validation rules details
- cURL examples
- Postman setup guide
- Error handling examples

### 4. **PROJECT_SUMMARY.md** - Overview

Project structure and highlights:

- Directory structure with descriptions
- MVCS layer breakdown
- Data flow diagram
- Features checklist
- Code statistics
- Best practices implemented

---

## 🏗️ Understanding the Architecture

### The 5 Layers

```
Layer 1: ROUTE          Handles HTTP path routing
            ↓
Layer 2: CONTROLLER     Handles HTTP request/response
            ↓
Layer 3: SERVICE        Implements business logic
            ↓
Layer 4: MODEL          Defines data structure
            ↓
Layer 5: STORE          Persists data (in-memory)
```

### Each Layer's Job

```
✓ Route        - Map /api/students → createStudent()
✓ Controller   - Extract request.body → call service
✓ Service      - Validate GPA, Age, Email → create model
✓ Model        - Hold id, firstName, lastName, etc.
✓ Store        - Save student in students array
```

### No Mixing Concerns!

```
❌ DON'T do this:
- Controller: contains business logic
- Service: sends HTTP response
- Model: has validation method
- Route: contains business logic

✅ DO this:
- Controller: only HTTP concerns
- Service: only business logic
- Model: only data structure
- Route: only path mapping
```

---

## 💻 Development Workflow

### Running in Development Mode (Auto-reload)

```bash
npm run dev
```

Every time you save a file, the server automatically restarts.

### Running in Production Mode

```bash
npm start
```

### Running Tests

```bash
node test.js
```

Shows all CRUD operations and validations working.

---

## 🧪 Test Scenarios

### Scenario 1: Create Valid Student

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "dateOfBirth": "2004-09-12",
    "gpa": 3.6,
    "email": "alice@example.com"
  }'
```

**Expected Response (201):**

```json
{
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "firstName": "Alice",
    "lastName": "Johnson",
    ...
  }
}
```

---

### Scenario 2: Validation - Invalid GPA

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Smith",
    "dateOfBirth": "2005-01-15",
    "gpa": 5.0,
    "email": "bob@example.com"
  }'
```

**Expected Response (400):**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

---

### Scenario 3: Validation - Too Young

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Charlie",
    "lastName": "Brown",
    "dateOfBirth": "2010-01-15",
    "gpa": 3.2,
    "email": "charlie@example.com"
  }'
```

**Expected Response (400):**

```json
{
  "error": "Student must be at least 18 years old"
}
```

---

### Scenario 4: Get All Students

```bash
curl http://localhost:3000/api/students
```

**Expected Response (200):**

```json
{
  "message": "Students retrieved successfully",
  "data": [
    { "id": 1, "firstName": "Alice", ... },
    { "id": 2, "firstName": "Diana", ... }
  ],
  "count": 2
}
```

---

### Scenario 5: Get Specific Student

```bash
curl http://localhost:3000/api/students/1
```

**Expected Response (200):**

```json
{
  "message": "Student retrieved successfully",
  "data": {
    "id": 1,
    "firstName": "Alice",
    ...
  }
}
```

---

### Scenario 6: Update Student

```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 3.8,
    "email": "alice.new@example.com"
  }'
```

**Expected Response (200):**

```json
{
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "firstName": "Alice",
    "gpa": 3.8,
    "email": "alice.new@example.com",
    ...
  }
}
```

---

### Scenario 7: Delete Student

```bash
curl -X DELETE http://localhost:3000/api/students/1
```

**Expected Response (200):**

```json
{
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "firstName": "Alice",
    ...
  }
}
```

---

### Scenario 8: Get Statistics

```bash
curl http://localhost:3000/api/students/statistics
```

**Expected Response (200):**

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

---

## 📂 File Structure Explained

### Project Root Files

```
package.json              Dependencies and scripts
.gitignore               Files to ignore in git
README.md                Main documentation
ARCHITECTURE.md          Detailed MVCS flow
API_GUIDE.md            API reference
PROJECT_SUMMARY.md      Structure overview
GETTING_STARTED.md      This file
test.js                 Test demonstrations
```

### src/app.js

```javascript
import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/students", studentRoutes);

app.listen(3000);
```

**Purpose:** Set up Express server and mount routes

---

### src/routes/studentRoutes.js

```javascript
import { StudentController } from "../controllers/StudentController.js";

const router = express.Router();

router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
// ... more routes
```

**Purpose:** Map HTTP paths to controller methods

---

### src/controllers/StudentController.js

```javascript
export class StudentController {
  static createStudent(req, res) {
    try {
      // Extract data
      const { firstName, lastName, dateOfBirth, gpa, email } = req.body;

      // HTTP validation
      if (!firstName || !lastName || ...) {
        return res.status(400).json({ error: '...' });
      }

      // Call service
      const student = studentService.createStudent(...);

      // Return response
      return res.status(201).json({ data: student });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
```

**Purpose:** Handle HTTP requests/responses, call services

---

### src/services/StudentService.js

```javascript
export class StudentService {
  createStudent(firstName, lastName, dateOfBirth, gpa, email) {
    // Validate GPA
    if (!this.validateGPA(gpa)) {
      throw new Error('GPA must be between 0 and 4.0');
    }

    // Validate Age
    if (!this.validateAge(dateOfBirth)) {
      throw new Error('Student must be at least 18 years old');
    }

    // Create model
    const student = new Student(...);

    // Store
    this.students.push(student);

    return student;
  }
}
```

**Purpose:** Implement business logic and validation

---

### src/models/Student.js

```javascript
export class Student {
  constructor(id, firstName, lastName, dateOfBirth, gpa, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gpa = gpa;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
```

**Purpose:** Define data structure only

---

## 🔍 Code Examples

### Example 1: Create Student Flow

**HTTP Request:**

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

**What Happens:**

1. **Route** (studentRoutes.js)

   ```javascript
   router.post("/", StudentController.createStudent);
   // Passes request to controller
   ```

2. **Controller** (StudentController.js)

   ```javascript
   const { firstName, lastName, dateOfBirth, gpa, email } = req.body;
   const student = studentService.createStudent(...);
   return res.status(201).json(student);
   ```

3. **Service** (StudentService.js)

   ```javascript
   if (!this.validateGPA(gpa)) throw Error('...');
   if (!this.validateAge(dateOfBirth)) throw Error('...');
   const student = new Student(...);
   this.students.push(student);
   return student;
   ```

4. **Model** (Student.js)
   ```javascript
   new Student(1, "John", "Doe", "2005-06-15", 3.8, "john@example.com");
   // Properties: id, firstName, lastName, dateOfBirth, gpa, email, createdAt, updatedAt
   ```

**HTTP Response:**

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

### Example 2: Validation Error Flow

**HTTP Request (Invalid GPA):**

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "dateOfBirth": "2004-03-20",
    "gpa": 5.0,
    "email": "jane@example.com"
  }'
```

**What Happens:**

1. **Route** → Routes to createStudent

2. **Controller** → Extracts data, calls service

   ```javascript
   const student = studentService.createStudent(...);
   // Service throws error here
   ```

3. **Service** → Validates GPA

   ```javascript
   if (!this.validateGPA(5.0)) {
     throw new Error("GPA must be between 0 and 4.0");
   }
   ```

4. **Error caught in Controller**
   ```javascript
   catch (error) {
     return res.status(400).json({ error: error.message });
   }
   ```

**HTTP Response:**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

---

## 🎓 Learning Checkpoints

### Checkpoint 1: Understanding Layers

- [ ] Can you name the 5 layers?
- [ ] Can you explain what each layer does?
- [ ] Can you identify the responsibility of each layer?

### Checkpoint 2: Request Flow

- [ ] Can you trace a request from Route → Response?
- [ ] Do you understand where validation happens?
- [ ] Do you know where business logic is implemented?

### Checkpoint 3: Adding Features

- [ ] Can you add a new validation rule?
- [ ] Can you add a new endpoint?
- [ ] Can you modify an existing feature?

### Checkpoint 4: Error Handling

- [ ] Do you understand why errors are caught at different levels?
- [ ] Can you add new error messages?
- [ ] Can you handle new error scenarios?

---

## 🚀 Next Steps

### Extend the Project

1. **Add Database (MongoDB/PostgreSQL)**

   - Replace in-memory store with database
   - No changes needed to Controllers
   - Minimal Service changes

2. **Add Authentication (JWT)**

   - Add middleware for token validation
   - Protect routes
   - MVCS structure unchanged

3. **Add Pagination**

   - Modify getAllStudents in Service
   - Add query parameters to Controller
   - No changes to Model

4. **Add Search/Filter**

   - Add new Service methods
   - Use in Controller
   - Extend routes

5. **Add Unit Tests**
   - Test each layer independently
   - Mock Service for Controller tests
   - Mock Database for Service tests

---

## 💡 Pro Tips

### Tip 1: Keep Layers Separate

- Don't put HTTP logic in Service
- Don't put business logic in Controller
- Don't put database logic in Model

### Tip 2: Use Service Injection

```javascript
// Current (Singleton)
const studentService = new StudentService();

// Better (Dependency Injection)
class StudentController {
  constructor(studentService) {
    this.studentService = studentService;
  }
}
```

### Tip 3: Centralize Validation

- All validation in Service
- Reuse validation methods
- Easy to modify rules

### Tip 4: Consistent Error Handling

```javascript
// Service throws
throw new Error('User message');

// Controller catches
catch (error) {
  // Formats HTTP response
}
```

---

## ❓ FAQ

### Q: Can I add a database?

**A:** Yes! The MVCS structure makes this easy. Just replace the in-memory array with database calls in the Service layer.

### Q: How do I add authentication?

**A:** Add a middleware before routes that checks JWT tokens. The MVCS structure remains unchanged.

### Q: Can I have multiple Services?

**A:** Yes! You can create additional services for different features (e.g., ReportService, EmailService).

### Q: How do I add validation?

**A:** Add methods to the Service layer. They're called during create/update operations.

### Q: Can I use a View layer?

**A:** This is an API, so there are no views. For a web app with templates, add a View layer after the Controller.

---

## 📞 Troubleshooting

### Server won't start

```bash
# Check if port 3000 is already in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Use different port
PORT=3001 npm start
```

### Module not found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tests failing

```bash
# Make sure server isn't running
# Run tests directly
node test.js
```

---

## 📖 Additional Resources

### Documentation in Project

- [README.md](README.md) - Overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed flow
- [API_GUIDE.md](API_GUIDE.md) - API reference
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Structure
- [test.js](test.js) - Working examples

### External Resources

- [Express.js Documentation](https://expressjs.com/)
- [MVCS Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [RESTful API Design](https://restfulapi.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## ✅ Checklist

Before deploying to production:

- [ ] All CRUD operations working
- [ ] All validations passing
- [ ] Error handling complete
- [ ] Logs added for debugging
- [ ] Database connection ready
- [ ] Environment variables configured
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Performance tested
- [ ] Security reviewed

---

## 🎉 You're Ready!

You now have a complete, production-ready MVCS architecture implementation. The structure is:

✅ **Clean** - Each layer has one responsibility
✅ **Scalable** - Easy to add features
✅ **Maintainable** - Easy to understand and modify
✅ **Professional** - Following industry standards
✅ **Well-Documented** - Clear code and comments

**Start the server and enjoy building! 🚀**

```bash
npm start
```

---

**Happy Coding! 🎓**
