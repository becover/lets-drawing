import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const SizeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input[type='range'] {
    width: 70%;
    -webkit-appearance: none;
    vertical-align: super;
    outline: none;
    border: none;
    padding: 0;
    background: none;
    margin: 0 10px;
  }
  ${(props) =>
    props.color &&
    css`
      input[type='range']:hover::-webkit-slider-thumb {
        background-color: ${props.color};
      }
    `}
  input[type='range']::-webkit-slider-runnable-track {
    background-color: #d7dbdd;
    height: 6px;
    border-radius: 3px;
    border: 1px solid transparent;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    border-radius: 50%;
    background-color: #666;
    height: 18px;
    width: 18px;
    margin-top: -7px;
  }

  label {
    display: inline-block;
    width: 70px;
    height: 60px;
    position: relative;
    border-radius: 5px;

    span {
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

function Size({ onChangeLineWidth, onChangeTextSize, textMode }) {
  const lineWidth = useSelector(({ canvas }) => canvas.lineWidth);
  const color = useSelector(({ canvas }) => canvas.color);
  const [Size, setSize] = useState(lineWidth);
  const whieelEventBindSize = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    if (delta + 1) {
      if (Size < 2) return false;
      setSize(Size - 1);
    } else {
      if (Size > 49) return false;
      setSize(Size + 1);
    }
  };
  useEffect(() => {
    onChangeLineWidth(Size);
    textMode === 'fill' && onChangeTextSize('text', Size);
    textMode === 'border' && onChangeTextSize('border', Size);
  }, [onChangeLineWidth, Size, textMode, onChangeTextSize]);

  return (
    <SizeContainer color={color} title="크기">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          id="ic_lens_24px"
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z"
          transform="translate(-2 -2)"
        />
      </svg>
      <input
        type="range"
        value={Size}
        min="1"
        max="50"
        step="1"
        onChange={(e) => setSize(e.target.valueAsNumber)} //+e.target.value
        onWheel={whieelEventBindSize}
        id="lineWidth"
      />
    </SizeContainer>
  );
}

export default Size;
