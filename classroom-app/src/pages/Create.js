import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  // Function to generate a 6-character code with letters, numbers, and special characters
  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
    let code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  };

  const handleCreate = () => {
    if (!className.trim()) return alert("Enter a valid class name!");
    
    const newCode = generateCode(); // Generate Class Code
    console.log("Class Name:", className, "Class Code:", newCode);
    
    // Navigate to Dashboard and pass class details using state
    navigate("/dashboard", {
      state: { className, classCode: newCode, instructor: "Harsha" }
    });
  };

  return (
    <div className="container p-4 border rounded shadow">
      <h2>Create a New Class</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default Create;
