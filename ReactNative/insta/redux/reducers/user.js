const initialState = {
  currentUser: null,
};

export default (state = initialState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
  // switch (action) {

  // case typeName:
  //     return { ...state, ...payload }

  // default:
  //     return state
  // }
};
