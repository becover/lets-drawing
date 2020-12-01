import React from 'react';
import Size from './Size';
import AlphaValue from './AlphaValue';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const RangeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px 10px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #c6c6c6;
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  input {
    cursor: pointer;
  }
`;

const CurrentColor = styled.div`
  position: relative;
  width: 70px;
  height: 100%;

  span {
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function Range({
  onChangeLineWidth,
  onChangeAlpha,
  onChangeColor,
  color,
  canvasMode,
  textMode,
  setTextModeAlpha,
  onChangeTextSize,
}) {
  const { lineWidth, alpha, isPainting } = useSelector(({ canvas }) => ({
    lineWidth: canvas.lineWidth,
    alpha: canvas.alpha,
  }));
  return (
    <RangeContainer isPainting={isPainting} style={{}}>
      <div>
        <Size
          onChangeLineWidth={onChangeLineWidth}
          onChangeTextSize={onChangeTextSize}
          textMode={textMode}
        />
        <AlphaValue
          onChangeAlpha={onChangeAlpha}
          onChangeColor={onChangeColor}
          color={color}
          canvasMode={canvasMode}
          textMode={textMode}
          setTextModeAlpha={setTextModeAlpha}
        />
      </div>
      <CurrentColor>
        <span
          style={{
            width: lineWidth,
            height: lineWidth,
            background: color,
            opacity: alpha,
          }}
        ></span>
      </CurrentColor>
    </RangeContainer>
  );
}

export default Range;
