import React from 'react';
import styled, { keyframes } from 'styled-components';
const dotJump = keyframes`
  0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
  }
  100% {
      -webkit-transform: translateY(-15px);
      transform: translateY(-15px);
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 10px;
  transform: translate(-50%, -50%);
  .dot {
    width: 10px;
    height: 10px;
    background: #00e676;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 5px);
  }

  .dot1 {
    left: 0px;
    animation: ${dotJump} 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate
      infinite;
  }

  .dot2 {
    left: 20px;
    animation: ${dotJump} 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28)
      alternate infinite;
  }

  .dot3 {
    left: 40px;
    animation: ${dotJump} 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28)
      alternate infinite;
  }
`;

export default function LoadingAnimation() {
  return (
    <Loader>
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </Loader>
  );
}
