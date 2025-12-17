# Student Management System - MVCS Architecture

A complete implementation of a **Student Management System** using **Express.js** following the **MVCS (Model – View – Controller – Service)** architecture pattern.

## 📋 Architecture Overview

### MVCS Pattern Breakdown

#### **Model (`src/models/Student.js`)**

- Represents the Student entity data structure
- Contains only properties: `id`, `firstName`, `lastName`, `dateOfBirth`, `gpa`, `email`
- No HTTP concerns, no business logic
- Pure data representation

#### **Service (`src/services/StudentService.js`)**

- Contains all business logic and validation rules:
  - **GPA Validation**: Must be between 0 and 4.0
  - **Age Validation**: Must be at least 18 years old (calculated from DOB)
  - **Email Validation**: Valid email format
- Acts as an intermediate layer between Controller and Model
- Handles CRUD operations with business rules
- Manages in-memory data store

#### **Controller (`src/controllers/StudentController.js`)**

- Handles HTTP concerns only (requests, responses, status codes)
- Parses incoming requests from routes
- Calls appropriate service methods
- Formats and returns HTTP responses
- No business logic - delegates to Service layer
- Error handling for HTTP responses

#### **Routes (`src/routes/studentRoutes.js`)**

- Maps HTTP methods and paths to controller methods
- Establishes API endpoints
- Acts as the entry point for HTTP requests

### Request Flow Diagram

```
HTTP REQUEST
    ↓
ROUTES (studentRoutes.js)
    ↓ Maps to appropriate endpoint
CONTROLLER (StudentController.js)
    ↓ Validates HTTP concerns, calls service
SERVICE (StudentService.js)
    ↓ Applies business logic, validates rules
MODEL (Student.js)
    ↓ Data structure
IN-MEMORY STORE
    ↓
RESPONSE RETURNED TO CLIENT
```

## 🎯 Features Implemented

### CRUD Operations with Business Logic

1. **Create Student** - `POST /api/students`

   - Validates GPA (0-4.0)
   - Validates age (≥18 years)
   - Validates email format
   - Returns student with auto-generated ID

2. **Get All Students** - `GET /api/students`

   - Returns list of all students
   - Includes count

3. **Get Student by ID** - `GET /api/students/:id`

   - Retrieves specific student
   - Returns 404 if not found

4. **Update Student** - `PUT /api/students/:id`

   - Updates any combination of fields
   - Validates all business rules for updated fields
   - Returns updated student

5. **Delete Student** - `DELETE /api/students/:id`

   - Removes student from store
   - Returns deleted student data
   - Returns 404 if not found

6. **Statistics** - `GET /api/students/statistics`
   - Total students count
   - Average GPA
   - Highest GPA
   - Lowest GPA

## 📁 Project Structure

```
student-management-system/
├── src/
│   ├── controllers/
│   │   └── StudentController.js      # HTTP handlers
│   ├── services/
│   │   └── StudentService.js         # Business logic
│   ├── models/
│   │   └── Student.js                # Data structure
│   ├── routes/
│   │   └── studentRoutes.js          # API routes
│   └── app.js                        # Express app setup
├── package.json                      # Dependencies
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run the Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

### Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/students`            | Create a new student |
| GET    | `/students`            | Get all students     |
| GET    | `/students/:id`        | Get student by ID    |
| PUT    | `/students/:id`        | Update student       |
| DELETE | `/students/:id`        | Delete student       |
| GET    | `/students/statistics` | Get statistics       |
| GET    | `/health`              | Health check         |

## 📋 Request/Response Examples

### Create Student

**Request:**

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.8,
    "email": "john.doe@example.com"
  }'
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
    "email": "john.doe@example.com",
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:30:00.000Z"
  }
}
```

**Error Response (400):**

```json
{
  "error": "GPA must be between 0 and 4.0"
}
```

### Get All Students

**Request:**

```bash
curl http://localhost:3000/api/students
```

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
      "email": "john.doe@example.com",
      "createdAt": "2025-12-17T10:30:00.000Z",
      "updatedAt": "2025-12-17T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### Get Student by ID

**Request:**

```bash
curl http://localhost:3000/api/students/1
```

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
    "email": "john.doe@example.com",
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:30:00.000Z"
  }
}
```

### Update Student

**Request:**

```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 3.9,
    "email": "john.newemail@example.com"
  }'
```

**Response (200):**

```json
{
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.9,
    "email": "john.newemail@example.com",
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:32:00.000Z"
  }
}
```

### Delete Student

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/students/1
```

**Response (200):**

```json
{
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2005-06-15",
    "gpa": 3.9,
    "email": "john.newemail@example.com",
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:32:00.000Z"
  }
}
```

### Get Statistics

**Request:**

```bash
curl http://localhost:3000/api/students/statistics
```

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

## 🔍 Business Logic Examples

### GPA Validation

- Valid range: 0 to 4.0
- Error: `"GPA must be between 0 and 4.0"`

### Age Validation

- Minimum age: 18 years
- Calculated from `dateOfBirth`
- Error: `"Student must be at least 18 years old"`

### Email Validation

- Pattern: `user@domain.extension`
- Error: `"Invalid email format"`

## 🏗️ Architecture Principles Applied

✅ **Separation of Concerns** - Each layer has a single responsibility
✅ **Layered Architecture** - Clean separation between HTTP, Business Logic, and Data
✅ **Service Pattern** - Business logic centralized in service layer
✅ **DRY (Don't Repeat Yourself)** - Reusable validation methods
✅ **Error Handling** - Consistent error responses from each layer
✅ **ES6 Modules** - Modern JavaScript module system
✅ **HTTP Best Practices** - Proper status codes and response formats
✅ **In-Memory Storage** - No external database required

## 🧪 Testing the API

### Using cURL

```bash
# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Smith","dateOfBirth":"2004-03-20","gpa":3.5,"email":"alice@example.com"}'

# Get all students
curl http://localhost:3000/api/students

# Get specific student
curl http://localhost:3000/api/students/1

# Update student
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"gpa":3.7}'

# Delete student
curl -X DELETE http://localhost:3000/api/students/1

# Get statistics
curl http://localhost:3000/api/students/statistics

# Health check
curl http://localhost:3000/api/health
```

### Using Postman

1. Import the endpoints as shown above
2. Set request method (GET, POST, PUT, DELETE)
3. Set body to JSON for POST/PUT requests
4. Send requests and view responses

## 📚 Key Concepts

### Why MVCS?

1. **Maintainability** - Easy to locate and modify code
2. **Testability** - Each layer can be tested independently
3. **Scalability** - Easy to add new features without affecting existing code
4. **Reusability** - Service logic can be reused across controllers
5. **Separation** - HTTP concerns separate from business logic

### Layer Responsibilities

| Layer          | Responsibility                                  |
| -------------- | ----------------------------------------------- |
| **Route**      | Map HTTP paths to controllers                   |
| **Controller** | Parse requests, call services, format responses |
| **Service**    | Business logic, validation, calculations        |
| **Model**      | Data structure definition                       |

## 🛡️ Error Handling

- **400 Bad Request** - Invalid input or validation errors
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Unexpected server errors
- All errors return JSON format with error message

## 📦 Dependencies

- **express** - Web framework
- **nodemon** (dev) - Auto-reload during development

## 🚀 Future Enhancements

- [ ] Add database integration (MongoDB, PostgreSQL)
- [ ] Add authentication (JWT)
- [ ] Add logging system
- [ ] Add input sanitization
- [ ] Add rate limiting
- [ ] Add unit tests
- [ ] Add API documentation (Swagger)
- [ ] Add search and filter functionality
- [ ] Add pagination for student list
- [ ] Add soft delete functionality

## 📝 License

ISC

## 👤 Author

Baraa Hawamdeh

**Happy coding! 🎓**
