import React, { useState } from "react";
import Create from "./Create"; // Import Create component

const ClassManager = () => {
  const [classes, setClasses] = useState([]); // Store created classes

  // Function to handle class creation
  const handleClassCreate = (newClass) => {
    setClasses([...classes, newClass]); // Add new class to state
    console.log("Class Created:", newClass);
  };

  return (
    <div className="container mt-5">
      <h2>Class Manager</h2>
      <Create onClassCreate={handleClassCreate} /> {/* ✅ Pass function to Create */}
      
      {/* ✅ Show Created Classes */}
      <div className="mt-4">
        <h4>Created Classes</h4>
        <ul className="list-group">
          {classes.map((cls, index) => (
            <li key={index} className="list-group-item">
              <strong>{cls.className}</strong> - Code: {cls.classCode}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassManager;
