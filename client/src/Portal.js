import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { modal } from './redux/modules/portal';

export default function Portal({ children }) {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const offModal = () => {
    onModal(false, null);
  };
  const modalElement = document.getElementById('modal');
  return createPortal(
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(0,0,0,.6)',
        zIndex: 999,
      }}
      onClick={offModal}
    >
      {children}
    </div>,
    modalElement,
  );
}
