import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideErrorModal } from '../../store/actions/errorActions.js';
import './modal.css';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const { isOpen, message } = useSelector(state => state.error);

  if (!isOpen) return null;

  return (
    <div className="error-modal-slide" role="alertdialog" aria-modal="true" onClick={() => dispatch(hideErrorModal())}>
      <div className="error-modal-dialog" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(hideErrorModal())} aria-label="Close modal">×</button>
        <h2>Error</h2>
        <div className="modal-body">
          <p style={{color: 'red'}}>{message}</p>
        </div>
        <div className="modal-actions">
          <button className="button primary" onClick={() => dispatch(hideErrorModal())}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
