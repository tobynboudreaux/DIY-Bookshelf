import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToBoard } from "../../actions/post";

const AddToBoard = ({ boards, post, addToBoard }) => {
  const [formData, setFormData] = useState("");

  const [displayAddButton, toggleAddButton] = useState(false);
  return (
    <div>
      <div className="my-2">
        <button
          onClick={() => toggleAddButton(!displayAddButton)}
          type="button"
          className="btn btn-primary"
        >
          Add to Board
        </button>
      </div>

      {displayAddButton && (
        <div>
          <p className="text-primary">Select a board</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              addToBoard(formData, post);
            }}
          >
            <div className="form-group">
              <select
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              >
                <option value="" name=""></option>
                {boards.map((board) => (
                  <option key={board._id} name="boardID" value={board._id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary my-1"
            ></input>
          </form>
        </div>
      )}
    </div>
  );
};

AddToBoard.propTypes = {
  addToBoard: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  post: PropTypes.string.isRequired,
};

export default connect(null, { addToBoard })(AddToBoard);
