import { useState } from "react";

function EditProfile() {
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", profile);
  };

  return (
    <div className="container">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="form-control mb-2"/>
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="form-control mb-2"/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2"/>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
