import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import { useState } from "react";
import { getCurrentProfile } from "../../actions/profile";

const Posts = ({
  getPosts,
  post: { posts, loading },
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    getPosts();
    getCurrentProfile();
  }, [getPosts]);

  const [show, toggleShow] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <button className="btn btn-primary" onClick={(e) => toggleShow(!show)}>
        Add Post
      </button>
      {show && <PostForm />}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} profile={profile} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
