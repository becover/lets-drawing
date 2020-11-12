import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from './redux/modules/portal';
import styled from 'styled-components';
const ModalLayout = styled.div``;

export default function Portal({ children }) {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const offModal = () => {
    onModal(false, null);
  };
  const { optionalProps } = useSelector(({ portal }) => ({
    optionalProps: portal.optionalProps,
  }));

  const modalElement = document.getElementById('modal');
  return createPortal(
    <ModalLayout
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: 'rgba(0,0,0,.6)',
        zIndex: 999,
      }}
      onClick={offModal}
    >
      {children}
    </ModalLayout>,
    modalElement,
  );
}
