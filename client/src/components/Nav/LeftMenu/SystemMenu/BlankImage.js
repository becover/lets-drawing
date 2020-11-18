import React from 'react';

export default function BlankImage({ onClear }) {
  const handleClearBtn = () => {
    onClear(true);
  };
  return (
    <span onClick={handleClearBtn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
      >
        <path
          id="ic_insert_drive_file_24px"
          d="M6,2A2,2,0,0,0,4.01,4L4,20a2,2,0,0,0,1.99,2H18a2.006,2.006,0,0,0,2-2V8L14,2Zm7,7V3.5L18.5,9Z"
          transform="translate(-4 -2)"
        />
      </svg>
    </span>
  );
}
