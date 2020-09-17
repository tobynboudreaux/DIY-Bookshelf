import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [formData, setText] = useState({
    title: "",
    text: "",
    image: "",
    tools: "",
    materials: "",
  });

  const { title, text, image, tools, materials } = formData;

  const onChange = (e) => {
    setText({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something... </h3>
      </div>
      <small>Post your favorite DIY Recipes or just say hello!</small>
      <br></br>
      <small>* = required field</small>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost(formData);
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
            name="text"
            cols="30"
            rows="5"
            placeholder="Post text goes here"
            value={text}
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
            type="text"
            name="tools"
            placeholder="Tools"
            value={tools}
            onChange={(e) => onChange(e)}
          ></input>
          <small className="form-text">
            If this is a recipe, what tools are needed?{" "}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="materials"
            placeholder="Materials"
            value={materials}
            onChange={(e) => onChange(e)}
          ></input>
          <small className="form-text">
            If this is a recipe, what materials are needed?{" "}
          </small>
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-dark my-1"
            value="Submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
