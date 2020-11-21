import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import styled, { css } from 'styled-components';

const PickerCanvas = styled.canvas`
  display: none;
  position: absolute;
  top: 200%;
  right: 0;
  width: 300px;
  height: 300px;
  z-index: 10;
  cursor: crosshair;
  border: 5px solid rgb(105, 155, 205);
  border-radius: 5px;
  ${(props) =>
    props.isPicking &&
    css`
      display: block;
    `}
`;

function ColorPicker({ onChangeStatusToPicking, onChangeColor, isPicking }) {
  const pickerRef = useRef();
  const [togglePicker, setTogglePicker] = useState(isPicking);

  const hanleTogglePicker = useCallback(() => {
    setTogglePicker((prevPicker) => !prevPicker);
  }, [setTogglePicker]);

  function createGradient(ctx, width, height) {
    let gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.15, 'rgb(255, 0, 255)');
    gradient.addColorStop(0.33, 'rgb(0, 0, 255)');
    gradient.addColorStop(0.5, 'rgb(0, 255, 255)');
    gradient.addColorStop(0.68, 'rgb(0, 255, 0)');
    gradient.addColorStop(0.82, 'rgb(255, 255, 0)');
    gradient.addColorStop(1, 'rgb(255, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  useEffect(() => {
    const picker = pickerRef.current;
    const ctx = picker.getContext('2d');
    picker.width = 300;
    picker.height = 300;
    createGradient(ctx, picker.width, picker.height);
  }, []);

  function buildRgbaString({ r, g, b, a }) {
    return `rgba(${r},${g},${b},${a})`;
  }

  function setColor2Canvas({ r, g, b, a }) {
    const colorString = buildRgbaString({ r, g, b, a });
    onChangeColor(colorString);
  }

  function getRgbaByImageData(imageData) {
    const [r, g, b, rawAlpha] = imageData.data;
    const a = rawAlpha / 255;
    return { r, g, b, a };
  }

  function pipetColor(ctx, x, y, e, width = 1, height = 1) {
    if (e.target && e.target.tagName === 'CANVAS') {
      const imageData = ctx.getImageData(x, y, width, height);
      const rgbaColor = getRgbaByImageData(imageData);
      return setColor2Canvas(rgbaColor);
    }
  }

  const hanleColorPicker = (e) => {
    const picker = pickerRef.current;
    const ctx = picker.getContext('2d');
    pipetColor(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY, e);
  };

  useEffect(() => {
    onChangeStatusToPicking(togglePicker);
  }, [onChangeStatusToPicking, togglePicker]);

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={hanleTogglePicker}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          id="ic_color_lens_24px"
          d="M12,3a9,9,0,0,0,0,18,1.5,1.5,0,0,0,1.11-2.51A1.494,1.494,0,0,1,14.23,16H16a5,5,0,0,0,5-5C21,6.58,16.97,3,12,3ZM6.5,12A1.5,1.5,0,1,1,8,10.5,1.5,1.5,0,0,1,6.5,12Zm3-4A1.5,1.5,0,1,1,11,6.5,1.5,1.5,0,0,1,9.5,8Zm5,0A1.5,1.5,0,1,1,16,6.5,1.5,1.5,0,0,1,14.5,8Zm3,4A1.5,1.5,0,1,1,19,10.5,1.5,1.5,0,0,1,17.5,12Z"
          transform="translate(-3 -3)"
        />
      </svg>
      <PickerCanvas
        isPicking={isPicking}
        ref={pickerRef}
        onClick={hanleColorPicker}
      ></PickerCanvas>
    </div>
  );
}

export default ColorPicker;
