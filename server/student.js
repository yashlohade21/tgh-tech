// models/Student.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  task: String,
  date: String,
});

const Student = mongoose.model('Student', employeeSchema);

module.exports = Student;
