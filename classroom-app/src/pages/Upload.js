import { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
      } else {
        setMessage("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container">
      <h2>Upload a File</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="form-control mb-2"/>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
