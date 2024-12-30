import React from "react";
import { Link } from "react-router-dom";
// import "./styles.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Admin Dashboard</h1>
      <p>Manage data effectively with secure authentication.</p>
      <div className="btn-group">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
