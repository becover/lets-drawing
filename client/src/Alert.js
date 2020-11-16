import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled, { keyframes } from 'styled-components';
import { modal } from './redux/modules/portal';

const popup = keyframes`
  0% {
    top: 5px;
  }
  50% {
    top: 5px;
  }
  100% {
    top: -100%
  }
`;
const AlertLayout = styled.div`
  padding: 20px;
  box-shadow: 0 0 5px rgba(50, 50, 50, 0.4), 0 0 10px rgba(50, 50, 50, 0.4);
  background: #fff;
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  animation: ${popup} 3s linear;
  p {
    color: royalblue;
  }
`;

export default function Alert() {
  const dispatch = useDispatch();
  const { optionalProps } = useSelector(({ portal }) => ({
    optionalProps: portal.optionalProps,
  }));
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const handleToast = () => {
    setTimeout(() => onModal(false, null), 1000 * 3);
  };
  return (
    <AlertLayout ref={(ref) => ref && handleToast()}>
      <p>{optionalProps.message}</p>
    </AlertLayout>
  );
}
