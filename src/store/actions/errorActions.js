// src/store/actions/errorActions.js
export const showErrorModal = (message) => ({
  type: 'SHOW_ERROR_MODAL',
  payload: { message }
});

export const hideErrorModal = () => ({
  type: 'HIDE_ERROR_MODAL'
});

