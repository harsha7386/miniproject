import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ClassRoom = () => {
  const location = useLocation();
  const classData =
    location.state || { className: "", classCode: "", instructor: "" };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // to store all messages
  const [files, setFiles] = useState([]); // to store file names

  const handleSendMessage = () => {
    if (message.trim()) {
      // Append the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(""); // Clear the input field
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demonstration, we store just the file name.
      // In production, you might upload the file to a server.
      setFiles((prevFiles) => [...prevFiles, file.name]);
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h3>{classData.className}</h3>
      <p>
        <strong>Class Code:</strong> {classData.classCode}
      </p>

      {/* File Upload */}
      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileUpload}
      />

      {/* Display Uploaded Files */}
      {files.length > 0 && (
        <div className="mb-3">
          <h5>Uploaded Files:</h5>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Messages */}
      {messages.length > 0 && (
        <div
          className="border p-3 mb-3"
          style={{ height: "150px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}

      {/* Message Input */}
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ClassRoom;
