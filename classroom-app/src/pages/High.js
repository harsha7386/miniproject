import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const High = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard"); // ✅ Redirect to Dashboard if already logged in
    }
  }, [isLoggedIn, navigate]);
  const validateForm = () => {
    let newErrors = {};
    if (isSignUp) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account Created Successfully!");
        setIsSignUp(false);
        setFormData({ username: "", firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error creating account. Try again later.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful!");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="container p-4 border py-2 text-center" style={{ maxWidth: "350px" }}>
      <h2>{isSignUp ? "Create Account" : "Welcome"}</h2>
      <p>{isSignUp ? "Sign up with your details" : "Please enter your details"}</p>

      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp && (
          <>
            <input type="text" name="username" placeholder="Username" className="form-control mb-2" onChange={handleChange} value={formData.username} />
            {errors.username && <small className="text-danger">{errors.username}</small>}

            <input type="text" name="firstName" placeholder="First Name" className="form-control mb-2" onChange={handleChange} value={formData.firstName} />
            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

            <input type="text" name="lastName" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} value={formData.lastName} />
            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
          </>
        )}

        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} value={formData.email} />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        <div className="input-group mb-2">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="form-control" onChange={handleChange} value={formData.password} />
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        {errors.password && <small className="text-danger">{errors.password}</small>}

        {isSignUp && (
          <>
            <div className="input-group mb-2">
              <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="form-control" onChange={handleChange} value={formData.confirmPassword} />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </>
        )}

        <button type="submit" className={`btn w-100 ${isSignUp ? "btn-success" : "btn-primary"}`}>
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>

      <p className="mt-2">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log In" : "Create Account"}
        </span>
      </p>
    </div>
  );
};

export default High;
