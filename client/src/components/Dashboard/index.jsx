// your-project-folder/src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch students from MongoDB when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    const student = students.find((emp) => emp._id === id);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.delete(`http://localhost:3001/students/${id}`);

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Student data has been deleted.',
            showConfirmButton: false,
            timer: 1500,
          });

          const updatedStudents = students.filter((student) => student._id !== id);
          setStudents(updatedStudents);
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            students={students}
            setStudents={setStudents}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          students={students}
          setStudents={setStudents}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          students={students}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
