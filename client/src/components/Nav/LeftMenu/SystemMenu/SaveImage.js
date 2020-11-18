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
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="16"
        viewBox="0 0 24 16"
      >
        <path
          id="ic_cloud_upload_24px"
          d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z"
          transform="translate(0 -4)"
        />
      </svg>
    </span>
  );
}

export default SaveImage;
