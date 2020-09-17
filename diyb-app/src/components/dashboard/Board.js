import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBoard, deletePostFromBoard } from "../../actions/profile";
import SavedPosts from "./SavedPosts";

const Board = ({ board, deleteBoard, posts }) => {
  const boards = board.map((board) => (
    <div key={board._id}>
      <h2>{board.title}</h2>
      <p>{board.description}</p>
      {board.saved_posts.map((post) => (
        <div className="saved-posts-row">
          <SavedPosts
            savedPost={post}
            key={post._id}
            board={board}
            boardID={board._id}
            posts={posts}
          />
        </div>
      ))}

      <button className="btn btn-danger" onClick={() => deleteBoard(board._id)}>
        Delete Board
      </button>
    </div>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Boards</h2>
      <ul className="boards">
        <li className="my-1">{boards}</li>
      </ul>
    </Fragment>
  );
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  deletePostFromBoard: PropTypes.func.isRequired,
};

export default connect(null, { deleteBoard, deletePostFromBoard })(Board);
