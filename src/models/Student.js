// Model: Represents the Student entity
// Responsibility: Data structure only - no business logic, no HTTP concerns

export class Student {
  constructor(id, firstName, lastName, dateOfBirth, gpa, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth; // ISO string format (YYYY-MM-DD)
    this.gpa = gpa;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
