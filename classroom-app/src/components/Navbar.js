import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, firstName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  const homepage = () => {
    navigate("/dashboard")
  }
  return (
    <div className="py-4 px-3" style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div className="container d-flex justify-content-between align-items-center border rounded shadow"
           style={{ marginLeft: "50px", paddingRight: "20px", marginTop: "10px", minHeight: "50px" }}>
        <div className="d-flex justify-content-start" style={{ paddingLeft: "40px", color: "blue" }}>
          <h1 onClick={homepage}>Classroom</h1>
        </div>

        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <span className="me-3 fw-bold text-primary">{firstName}</span> {/* ✅ Show First Name */}
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <span className="text-muted">Not Logged In</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
