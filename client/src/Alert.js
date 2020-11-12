import React from 'react';
import { useSelector } from 'react-redux';

import styled, { keyframes } from 'styled-components';

const popup = keyframes`
0%{
top:0;
}
50%{
top:0%
}
100%{
top:-100%
}
`;
const AlertLayout = styled.div`
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.4);
  background: #fff;
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  animation: ${popup} 3s linear;
`;

export default function Alert() {
  const { optionalProps } = useSelector(({ portal }) => ({
    optionalProps: portal.optionalProps,
  }));
  return (
    <AlertLayout>
      <p>{optionalProps.message}</p>
    </AlertLayout>
  );
}
