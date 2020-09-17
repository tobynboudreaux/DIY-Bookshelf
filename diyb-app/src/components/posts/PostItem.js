import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, unLike, deletePost } from "../../actions/post";
import AddToBoard from "./AddToBoard";
import AddInstructions from "./AddInstructions";
import Instructions from "./Instructions";
import Spinner from "../layout/Spinner";

const PostItem = ({
  addLike,
  unLike,
  deletePost,
  auth,
  post: {
    loading,
    _id,
    title,
    text,
    image,
    tools,
    materials,
    instructions,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
  showActions,
  profile,
}) => {
  const [showInst, toggleInst] = useState(false);
  const [display, toggleDisplay] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <div className="post p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <h2 className="my-1">{title}</h2>
        <p className="my-1">{text}</p>
        <img className="post-image" src={image} alt="" />
        {tools && (
          <p className="my-1">
            <i className="fas fa-tools"></i> Tools: {tools}
          </p>
        )}{" "}
        {materials && (
          <p className="my-1">
            <i className="fas fa-tree"></i> Materials: {materials}
          </p>
        )}
        {instructions.length > 0 && (
          <ul>
            <i className="fas fa-map"></i> Instructions:
            <Instructions
              instructions={instructions}
              display={display}
              toggleDisplay={toggleDisplay}
            />
          </ul>
        )}
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button className="btn btn-primary" onClick={(e) => addLike(_id)}>
              <i className="fas fa-thumbs-up" />
              {likes.length > 0 && (
                <span className="text-dark">{likes.length}</span>
              )}
            </button>
            <button className="btn btn-primary" onClick={(e) => unLike(_id)}>
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            <div className="button-line">
              {profile === null ? (
                ""
              ) : (
                <AddToBoard boards={profile.boards} post={_id} />
              )}
              {!auth.loading && user === auth.user._id && (
                <div>
                  <button
                    onClick={(e) => toggleInst(!showInst)}
                    className="btn btn-primary"
                  >
                    Add Instructions
                  </button>
                  {showInst && <AddInstructions postID={_id} />}
                  <button
                    onClick={(e) => deletePost(_id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  unLike,
  deletePost,
})(PostItem);
