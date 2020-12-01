import React from 'react';
import styled from 'styled-components';

const LoadButton = styled.span`
  input {
    width: 0;
    height: 0;
    opacity: 0;
  }
  label {
    cursor: pointer;
  }
`;

function LoadImage({ onSettingButton }) {
  const onHandleClick = (e) => {
    onSettingButton('loadImage', 'isActive', true);
    const file = e.target.files[0];
    const url = window.URL || window.webkitURL;
    const src = url.createObjectURL(file);
    onSettingButton('loadImage', 'src', src);
  };

  return (
    <LoadButton>
      <input
        type="file"
        name="uploadImgFile"
        size="22"
        onChange={onHandleClick}
        id="fileLoad"
      />
      <label htmlFor="fileLoad">
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
        >
          <path
            d="M7.5 6v5M5 8.5h5m-9.5-6v10a1 1 0 001 1h12a1 1 0 001-1v-8a1 1 0 00-1-1h-6l-2-2h-4a1 1 0 00-1 1z"
            stroke="currentColor"
          ></path>
        </svg>
      </label>
    </LoadButton>
  );
}

export default LoadImage;
