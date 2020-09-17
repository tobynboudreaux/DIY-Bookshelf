import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="/add-board" className="btn btn-light">
        <i className="fas fa-user-circle"></i> Add a Board
      </Link>
    </div>
  );
};

export default DashboardActions;
