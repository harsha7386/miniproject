import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();

  // For demonstration, simulate a list of available classes.
  // In a real app, this could come from a backend API or global state.
  const availableClasses = [
    { className: "Algebra 101", classCode: "ABC123", instructor: "Harsha" },
    { className: "Geometry Basics", classCode: "XYZ789", instructor: "Harsha" },
  ];

  const handleJoin = () => {
    if (!classCode.trim()) return alert("Enter a valid class code!");

    // Simulate finding a class by classCode
    const foundClass = availableClasses.find(
      (cls) => cls.classCode.toUpperCase() === classCode.toUpperCase()
    );

    if (!foundClass) {
      alert("Invalid Class Code!");
      return;
    }

    // Navigate to Dashboard and pass the found class details
    navigate("/dashboard", { state: foundClass });
  };

  return (
    <div className="container p-4 border rounded shadow mt-4">
      <h2>Join a Class</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={handleJoin}>
        Join
      </button>
    </div>
  );
};

export default Join;
