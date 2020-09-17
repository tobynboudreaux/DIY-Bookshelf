import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBoard } from "../../actions/profile";

const AddBoard = ({ addBoard, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    addBoard(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add A Board</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add a Board to hold your saved
        posts in.
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Board Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Board Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddBoard.propTypes = {
  addBoard: PropTypes.func.isRequired,
};

export default connect(null, { addBoard })(AddBoard);
