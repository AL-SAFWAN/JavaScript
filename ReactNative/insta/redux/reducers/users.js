import {
  USERS_DATA_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  CLEAR_DATA
} from "../actions/type";

const initialState = {
  users: [],
  usersFollowingLoaded: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        users: state.users.map((user) => {
          return user.uid === action.uid
            ? { ...user, posts: action.posts }
            : user;
        }),
      };
      case CLEAR_DATA:
        return { ...initialState };
    default:
      return state;
  }
};