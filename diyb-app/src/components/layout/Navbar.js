import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, history }) => {
  const authLinks = (
    <ul className="main-nav">
      <li>
        <Link to="/profiles">
          <i className="fas fa-address-book"></i> Profiles
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-server"></i> Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-id-card"></i> Dashboard
        </Link>
      </li>
      <li>
        <a onClick={(e) => logout(history)} style={{ cursor: "pointer" }}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="main-nav">
      <li>
        <Link to="/profiles">
          <i className="fas fa-address-book"></i> Profiles
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-book"></i> DIY-B
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
