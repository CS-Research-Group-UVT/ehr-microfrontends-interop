// src/store/reducers/errorReducer.js
const INITIAL_STATE = {
  isOpen: false,
  message: ''
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_ERROR_MODAL':
      return { isOpen: true, message: action.payload.message };
    case 'HIDE_ERROR_MODAL':
      return { isOpen: false, message: '' };
    default:
      return state;
  }
};
