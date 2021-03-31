import { USER_POST_STATE_CHANGE, USER_STATE_CHANGE } from "../actions/type";

const initialState = {
  currentUser: null,
  posts:[]
};

export default (state = initialState, action) => {

  switch (action) {

  case USER_STATE_CHANGE:
    return {
    ...state,
    currentUser: action.currentUser,
  }
  case USER_POST_STATE_CHANGE:
    return{
      ...state,
      posts: action.posts
    }

  default:
      return state
  }
    
};
