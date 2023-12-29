// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yashlohade:0000@cluster0.pw1pujl.mongodb.net/employeesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  task: String,
  date: String,
});

const Student = mongoose.model('Student', studentSchema);

// Create student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
