import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../layout/Spinner";
import {
  getProfileById,
  followUser,
  unfollowUser,
} from "../../actions/profile";
import { Link } from "react-router-dom";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
  unfollowUser,
  followUser,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const follow = (e) => {
    e.preventDefault();
    followUser(profile.user._id);
  };

  const unfollow = (e) => {
    e.preventDefault();
    unfollowUser(profile.user._id);
  };

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            <i className="fas fa-arrow-alt-circle-left"></i> Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                {" "}
                <i className="fas fa-user-circle"></i> Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id !== profile.user._id && (
                <button onClick={(e) => follow(e)} className="btn btn-light">
                  Follow User
                </button>
              )}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id !== profile.user._id &&
              auth.user.followees.map((arr) =>
                arr.user === profile.user._id ? (
                  <button
                    onClick={(e) => unfollow(e)}
                    className="btn btn-danger"
                  >
                    Unfollow User
                  </button>
                ) : null
              )}
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfileById,
  followUser,
  unfollowUser,
})(Profile);
