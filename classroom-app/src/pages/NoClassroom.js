import { Link } from "react-router-dom";

function NoClassroom() {
  return (
    <div className="container text-center">
      <h2>Classroom Not Found</h2>
      <p>Sorry! The requested classroom doesn't exist.</p>
      <img src="/images/error.svg" alt="Error" width="300px" />
      <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
    </div>
  );
}

export default NoClassroom;
