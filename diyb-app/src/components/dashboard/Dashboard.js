import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Board from "./Board";
import {
  getCurrentProfile,
  deleteAccount,
  getProfiles,
} from "../../actions/profile";
import { getPosts } from "../../actions/post";
import Follower from "./Follower";
import Followee from "./Followee";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, profiles, loading },
  getPosts,
  getProfiles,
  post: { posts },
}) => {
  useEffect(() => {
    getCurrentProfile() && getPosts() && getProfiles();
  }, [getCurrentProfile, getPosts, getProfiles]);
  const [followerDisplay, toggleDisplay1] = useState(false);
  const [followeeDisplay, toggleDisplay2] = useState(false);

  const users = profiles.map((profile) => {
    return profile.user;
  });

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <div className="dashboard">
        <p className="lead text-primary">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>

        <div className="follow">
          <p className="my-3" onClick={(e) => toggleDisplay1(!followerDisplay)}>
            {user.followers && user.followers.length === 0
              ? "no followers"
              : `${user.followers.length} followers`}
          </p>

          {followerDisplay && (
            <div className="modal">
              <div className="modal-content">
                {" "}
                <p>Followers</p>
                {user.followers.map((p) => (
                  <Follower follower={p} key={p._id} users={users} />
                ))}
                <button
                  className="btn btn-light"
                  onClick={(e) => toggleDisplay1(!followerDisplay)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <p className="my-3" onClick={(e) => toggleDisplay2(!followeeDisplay)}>
            {user.followees && user.followees.length === 0
              ? "no followees"
              : `${user.followees.length} following`}
          </p>

          {followeeDisplay && (
            <div className="modal">
              <div className="modal-content">
                {" "}
                <p>Followees</p>
                {user.followees.map((p) => (
                  <Followee followee={p} key={p._id} users={users} />
                ))}
                <button
                  className="btn btn-light"
                  onClick={(e) => toggleDisplay2(!followeeDisplay)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <div className="boards">
              <Board board={profile.boards} posts={posts} />
            </div>
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              {" "}
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getPosts,
  getProfiles,
})(Dashboard);
