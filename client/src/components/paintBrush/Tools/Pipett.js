import React from 'react';
import styled from 'styled-components';
const PipettVsg = styled.div`
  cursor: pointer;
  ${(props) => props.isPipetting && `svg path {fill:tomato}`}
`;

function Pipett({ onChangeStatusToPipetting, isPicking, isPipetting }) {
  return (
    <PipettVsg
      isPipetting={isPipetting}
      onClick={() => !isPicking && onChangeStatusToPipetting(true)}
    >
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
      >
        <path
          d="M13.768 1.06a2.5 2.5 0 00-3.536 0L7.5 3.794l-.646-.647-.708.708 5 5 .708-.708-.647-.646 2.732-2.732a2.5 2.5 0 000-3.536l-.171-.171zM6.146 6.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708L2.707 15H.5a.5.5 0 01-.5-.5v-2.207l6.146-6.147z"
          fill="currentColor"
        ></path>
      </svg>
    </PipettVsg>
  );
}

export default Pipett;
