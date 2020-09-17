import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { deletePostFromBoard } from "../../actions/profile";

const SavedPosts = ({ boardID, savedPost, deletePostFromBoard, posts }) => {
  const { _id, post, note, description } = savedPost;

  const [display, toggleDisplay] = useState(false);

  let postInfo = posts.filter((pos) => pos._id === post);

  postInfo = postInfo[0];

  return (
    <div key={postInfo && postInfo._id} className="saved-posts-column">
      <div className="saved-post">
        <Link to={`/posts/${post}`} className="board-links">
          {postInfo && postInfo.title}
        </Link>
        <img
          onClick={(e) => toggleDisplay(!display)}
          src={postInfo && postInfo.image}
          alt=""
        ></img>

        {display && (
          <div className="modal">
            <div className="modal-content">
              <div
                style={{
                  textAlign: "center",
                  background: "var(--light-color)",
                }}
              >
                <div>
                  <p className="my-1">{postInfo && postInfo.text}</p>
                  <Link to={`/posts/${post}`} className="board-links">
                    {postInfo && postInfo.title}
                  </Link>
                </div>
              </div>

              <p>{!note ? "" : `Your Note: ${note}`}</p>
              <p>{!description ? "" : `Your Description: ${description}`}</p>
              <button
                className="btn btn-danger my-2"
                onClick={(e) => deletePostFromBoard(boardID, _id)}
              >
                Delete Post From Board
              </button>
              <button
                className="btn btn-light"
                onClick={(e) => toggleDisplay(!display)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SavedPosts.propTypes = {
  deletePostFromBoard: PropTypes.func.isRequired,
};

export default connect(null, { deletePostFromBoard })(SavedPosts);
