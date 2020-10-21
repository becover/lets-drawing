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
          width="22"
          height="14"
          viewBox="0 0 22 14"
        >
          <path
            id="ic_burst_mode_24px"
            d="M1,5H3V19H1ZM5,5H7V19H5ZM22,5H10A1,1,0,0,0,9,6V18a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V6A1,1,0,0,0,22,5ZM11,17l2.5-3.15L15.29,16l2.5-3.22L21,17Z"
            transform="translate(-1 -5)"
          />
        </svg>
      </label>
    </LoadButton>
  );
}

export default LoadImage;
