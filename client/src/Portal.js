import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from './redux/modules/portal';
import styled, { keyframes } from 'styled-components';
const smoothShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ModalLayout = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  animation: ${smoothShow} 0.6s ease-out;
  ${(props) => props?.optionalProps?.message && `background: rgba(0,0,0,.0)`}
`;

export default function Portal({ children }) {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const offModal = () => {
    onModal(false, null);
  };
  const { optionalProps } = useSelector(({ portal }) => ({
    optionalProps: portal?.optionalProps,
  }));

  const modalElement = document.getElementById('modal');
  return createPortal(
    <ModalLayout optionalProps={optionalProps} onClick={offModal}>
      {children}
    </ModalLayout>,
    modalElement,
  );
}
