import React, { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const CanvasElem = styled.canvas`
  ${(props) =>
    props.isPipetting &&
    css`
      z-index: 5;
    `}
`;

function Canvas({
  width,
  height,
  undo,
  isPipetting,
  onChangeStatusToPipetting,
  onChangeColor,
  saveImage,
  onPushImage,
  onSettingButton,
}) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    if (undo.length > 0)
      undo.forEach((image) => ctx.drawImage(image, 0, 0, width, height));
  }, [undo, width, height]);

  function buildRgbaString({ r, g, b, a }) {
    return `rgba(${r},${g},${b},${a})`;
  }

  function setColor2Canvas({ r, g, b, a }) {
    const colorString = buildRgbaString({ r, g, b, a });
    console.log(colorString);
    onChangeColor(colorString);
  }

  function getRgbaByImageData(imageData) {
    const [r, g, b, rawAlpha] = imageData.data;
    const a = rawAlpha / 255;
    return { r, g, b, a };
  }

  function pipetColor(ctx, x, y, e, width = 1, height = 1) {
    onChangeStatusToPipetting(false);
    if (e.target && e.target.tagName === 'CANVAS') {
      const imageData = ctx.getImageData(x, y, width, height);
      const rgbaColor = getRgbaByImageData(imageData);
      return setColor2Canvas(rgbaColor);
    }
  }

  const onHandleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    isPipetting &&
      pipetColor(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY, e);
  };

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const watchSaveFileButton = useCallback(() => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const timeStamp = getToday();
    onPushImage([image, timeStamp]);
    onSettingButton('saveImage', 'isActive', false);
  }, [onPushImage, onSettingButton]);

  useEffect(() => {
    saveImage.isActive && watchSaveFileButton();
  }, [saveImage.isActive, watchSaveFileButton]);
  return (
    <CanvasElem
      isPipetting={isPipetting}
      style={{
        position: 'absolute',
        width: width,
        height: height,
      }}
      ref={canvasRef}
      onClick={onHandleCanvasClick}
    ></CanvasElem>
  );
}

export default Canvas;
