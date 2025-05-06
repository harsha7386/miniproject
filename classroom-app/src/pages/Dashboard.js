import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve class details passed via navigation state (if any)
  const { className, classCode, instructor } = location.state || {};
  const [createdClass, setCreatedClass] = useState(null);

  // When class details exist in location state, update local state
  useEffect(() => {
    if (className) {
      setCreatedClass({ className, classCode, instructor });
    }
  }, [className, classCode, instructor]);

  const [showWelcome, setShowWelcome] = useState(true);

  const createClass = () => {
    navigate("/create");
  };

  const joinClass = () => {
    navigate("/join");
  };

  // Navigate to the classroom page, passing the created class details.
  const goToClassRoom = () => {
    if (createdClass) {
      navigate("/classroom", { state: createdClass });
    }
  };

  return (
    <div
      className="container py-0 px-0"
      style={{ maxWidth: "1100px", margin: "0 auto" }}
    >
      {/* Welcome Box */}
      {showWelcome && (
        <div className="d-flex align-items-center justify-content-between rounded shadow p-3 bg-light">
          <h6 className="text-center flex-grow-1 m-0">
            Welcome Harsha, enjoy the fun & interactive way of learning!
          </h6>
          <button
            className="btn btn-light"
            onClick={() => setShowWelcome(false)}
            style={{ marginLeft: "auto" }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      {/* Main Section: Buttons and Image */}
      <div className="d-flex align-items-center justify-content-between mt-5">
        {/* Left Section: Text & Buttons */}
        <div className="text-center">
          <h1 className="mb-4">Welcome to the Alternative Learning</h1>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary px-4 py-2 shadow-lg rounded"
              onClick={createClass}
            >
              <i className="bi bi-plus-lg me-2"></i> Create Class
            </button>
            <button
              className="btn btn-success px-4 py-2 shadow-lg rounded"
              onClick={joinClass}
            >
              <i className="bi bi-person-plus-fill me-2"></i> Join Class
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <img
          src="/undraw_true-friends_i66s (1).svg"
          alt="True Friends"
          className="img-fluid"
          style={{ maxWidth: "500px", height: "auto" }}
        />

      </div>

      {/* Conditionally Display Class Information if a class was created */}
      {createdClass && (
        <div
          className="card p-3 shadow mt-5 mx-auto"
          style={{ maxWidth: "300px", cursor: "pointer" }}
          onClick={goToClassRoom}
        >
          <h5>Instructor: {createdClass.instructor}</h5>
          <p>
            <strong>Class Name:</strong> {createdClass.className}
          </p>
          <p>
            <strong>Class Code:</strong> {createdClass.classCode}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
