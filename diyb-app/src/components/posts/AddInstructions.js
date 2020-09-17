import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { addInstructions } from "../../actions/post";
import { connect } from "react-redux";

const AddInstructions = ({ addInstructions, postID }) => {
  const [formData, setFormData] = useState({
    title: "",
    directions: "",
    image: "",
  });

  const { title, directions, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <div className="bg-primary p">
        <h3>Add Instructions to Post... </h3>
      </div>
      <br></br>
      <small>* = required field</small>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addInstructions(postID, formData);
          refreshPage();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => onChange(e)}
          ></input>
          <small className="form-text">
            * What do you want people to see first?
          </small>
        </div>
        <div className="form-group">
          <textarea
            name="directions"
            cols="30"
            rows="5"
            placeholder="Directions go here"
            value={directions}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <small className="form-text">* What is this post about?</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="Image Url"
            value={image}
            onChange={(e) => onChange(e)}
          ></input>
          <small className="form-text">Images if ya got em! </small>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary my-1"
          ></input>
        </div>
      </form>
    </div>
  );
};

AddInstructions.propTypes = {
  addInstructions: PropTypes.func.isRequired,
};

export default connect(null, { addInstructions })(AddInstructions);
