import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  POST_DELETED,
  POST_ADDED,
  COMMENT_ADDED,
  COMMENT_DELETED,
  ADD_TO_BOARD,
  PROFILE_ERROR,
  ADD_INSTRUCTIONS,
  REMOVE_INSTRUCTIONS,
} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by id
export const getPostById = (postID) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${postID}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Like
export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Unlike
export const unLike = (postID) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({
      type: POST_DELETED,
      payload: postID,
    });

    dispatch(setAlert("Post Removed", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: POST_ADDED,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postID, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postID}`,
      formData,
      config
    );

    dispatch({
      type: COMMENT_ADDED,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);

    dispatch({
      type: COMMENT_DELETED,
      payload: commentID,
    });

    dispatch(setAlert("Comment Removed", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addToBoard = (boardID, postID) => async (dispatch) => {
  try {
    const res = await axios.put(`api/profile/boards/${boardID}/${postID}`);

    dispatch({
      type: ADD_TO_BOARD,
      payload: res.data,
    });

    dispatch(setAlert("Post Added to Board", "succes"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addInstructions = (postID, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.put(
      `api/posts/${postID}/instructions`,
      formData,
      config
    );

    dispatch({
      type: ADD_INSTRUCTIONS,
      payload: res.data,
    });

    dispatch(setAlert("Added Instructions to Post", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Instruction
export const removeInstruction = (postID, instructionID) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/posts/${postID}/instructions/${instructionID}`);

    dispatch({
      type: REMOVE_INSTRUCTIONS,
      payload: instructionID,
    });

    dispatch(setAlert("Instructions Removed", "succes"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
