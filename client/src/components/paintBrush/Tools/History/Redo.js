import React from 'react';
import styled from 'styled-components';

const RedoIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  @media only screen and (max-width: 786px) {
    svg {
      transform: scale(1.5);
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg path {
    fill: coral;
  }
`;

function Redo({ onRedo }) {
  return (
    <RedoIcon onClick={() => onRedo()} title="다시실행">
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M14 8.495v-.5h-1v.5h1zM7.5 2.999H8v-1h-.5v1zm1-.5l.353.353.354-.353-.354-.354-.353.354zM13 8.495a5.499 5.499 0 01-5.5 5.496v1c3.589 0 6.5-2.909 6.5-6.496h-1zM7.5 13.99A5.499 5.499 0 012 8.495H1a6.499 6.499 0 006.5 6.496v-1zM2 8.495a5.499 5.499 0 015.5-5.496v-1A6.499 6.499 0 001 8.495h1zM6.147.854l2 1.998.706-.707-2-1.999-.706.708zm2 1.291l-2 1.999.706.707 2-1.999-.706-.707z"
          fill="currentColor"
        ></path>
      </svg>
    </RedoIcon>
  );
}

export default Redo;
