import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  POST_DELETED,
  POST_ADDED,
  GET_POST,
  COMMENT_ADDED,
  COMMENT_DELETED,
  ADD_INSTRUCTIONS,
  REMOVE_INSTRUCTIONS,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ADDED:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postID ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case COMMENT_ADDED:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case COMMENT_DELETED:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case ADD_INSTRUCTIONS:
      return {
        ...state,
        post: { ...state.post, instructions: payload },
        loading: false,
      };
    case REMOVE_INSTRUCTIONS:
      return {
        ...state,
        post: {
          ...state.post,
          instructions: state.post.instructions.filter(
            (instruction) => instruction._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
