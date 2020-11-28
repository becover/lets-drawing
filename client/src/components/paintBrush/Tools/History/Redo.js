import React from 'react';
import styled from 'styled-components';

const RedoIcon = styled.div`
  cursor: pointer;
  transform: rotateY(180deg);
  transform-origin: right;
  position: absolute;
  right: calc(-15% + 16px);
  bottom: 0;
  @media only screen and (max-width: 786px) {
    transform: rotateY(180deg) scale(2);
    right: calc(-15% + 24px);
    bottom: 10px;
  }
  &:hover svg {
    fill: #333;
  }
`;

function Redo({ onRedo }) {
  return (
    <RedoIcon onClick={() => onRedo()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="#666"
      >
        <path
          id="ic_replay_24px"
          d="M12,5V1L7,6l5,5V7a6,6,0,1,1-6,6H4a8,8,0,1,0,8-8Z"
          transform="translate(-4 -1)"
        />
      </svg>
    </RedoIcon>
  );
}

export default Redo;
