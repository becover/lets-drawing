import React from 'react';
import Alert from '../../../../Alert';

function SaveImage({ onSettingButton, isLogged, onModal, onModalProps }) {
  const handleClick = () => {
    if (isLogged) {
      onSettingButton('saveImage', 'isActive', true);
    } else {
      onModalProps({ message: '로그인을 먼저 해주세요!', needAfter: true });
      onModal(true, Alert);
    }
  };
  return (
    <span onClick={handleClick}>
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
      >
        <path
          d="M7.5 1.5l3.25 3m-3.25-3l-3 3m3-3V11m6-4v6.5h-12V7"
          stroke="currentColor"
        ></path>
      </svg>
    </span>
  );
}

export default SaveImage;
