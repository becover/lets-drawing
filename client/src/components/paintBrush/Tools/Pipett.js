import React from 'react';

function Pipett({ onChangeStatusToPipetting, isPicking }) {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => !isPicking && onChangeStatusToPipetting(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.001"
        height="18.002"
        viewBox="0 0 18.001 18.002"
      >
        <path
          id="ic_colorize_24px"
          d="M20.71,5.63,18.37,3.29a1,1,0,0,0-1.41,0L13.84,6.41,11.91,4.5,10.5,5.91l1.42,1.42L3,16.25V21H7.75l8.92-8.92,1.42,1.42,1.41-1.41-1.92-1.92L20.7,7.05a1,1,0,0,0,.01-1.42ZM6.92,19,5,17.08l8.06-8.06,1.92,1.92Z"
          transform="translate(-3 -2.998)"
        />
      </svg>
    </div>
  );
}

export default Pipett;
