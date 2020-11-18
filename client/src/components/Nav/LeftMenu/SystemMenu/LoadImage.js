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
  label:hover svg {
    fill: #ff7b57;
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
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          viewBox="0 0 20 16"
        >
          <path
            id="ic_folder_open_24px"
            d="M20,6H12L10,4H4A2,2,0,0,0,2.01,6L2,18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V8A2.006,2.006,0,0,0,20,6Zm0,12H4V8H20Z"
            transform="translate(-2 -4)"
          />
        </svg>
      </label>
    </LoadButton>
  );
}

export default LoadImage;
