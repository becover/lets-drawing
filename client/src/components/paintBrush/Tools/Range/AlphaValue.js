import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const AlphaValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

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

  svg {
    width: 20px;
    height: 24px;
  }
`;

function AlphaValue({
  onChangeAlpha,
  onChangeColor,
  color,
  canvasMode,
  textMode,
  setTextModeAlpha,
}) {
  const [Alpha, setAlpha] = useState(100);
  const alphaRangeRef = useRef();
  // const color = useSelector(({ canvas }) => canvas.color);

  // const handleAlphaMode = useCallback(() => {
  //   if (canvasMode === 'text') {
  //     const rgbColorCodeRegExp = /(rgba|rgb)\((\d+), ?(\d+), ?(\d+),? ?(\d+|\d\.\d+)?\)/g;
  //     const replaceReg = /^(, ?(\d+|\d\.\d+)\))$/g;
  //     const result = rgbColorCodeRegExp.exec(color);
  //     let newColor;
  //     if (result && result[5] === undefined) {
  //       newColor = color.replace(')', `, ${Alpha / 100})`);
  //       onChangeColor(newColor);
  //       console.log(color);
  //     } else {
  //       newColor = color.replace(replaceReg, `, ${Alpha / 100})`);
  //       onChangeColor(newColor);
  //       console.log(color);
  //     }
  //   }
  //   if (canvasMode === 'brush') onChangeAlpha(Alpha / 100);
  // }, [Alpha, onChangeAlpha, canvasMode, onChangeColor, color]);
  useEffect(() => {
    const cancelEvent = (e) => e.preventDefault();
    const alphaDom = alphaRangeRef.current;
    alphaDom.addEventListener('wheel', cancelEvent, {
      passive: false,
    });
    return () => {
      alphaDom.removeEventListener('wheel', cancelEvent, {
        passive: false,
      });
    };
  }, []);
  useEffect(() => {
    if (canvasMode === 'text') {
      const [, colorStruc] = color.split('(');
      const [colorNumbers] = colorStruc.split(')');
      let [r, g, b, a = Alpha / 100] = colorNumbers.split(',');
      a = Alpha / 100;
      console.log(`rgba(${r},${g},${b},${a})`);
      onChangeColor(`rgba(${r},${g},${b},${a})`);
      setTextModeAlpha(Alpha);
    } else {
      onChangeAlpha(Alpha / 100);
    }
    if (canvasMode === 'brush') onChangeAlpha(Alpha / 100);
  }, [
    Alpha,
    onChangeAlpha,
    canvasMode,
    onChangeColor,
    color,
    setTextModeAlpha,
  ]);

  const whieelEventBindAlpha = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    if (delta + 1) {
      if (Alpha < 2) return false;
      setAlpha(Alpha - 1);
    } else {
      if (Alpha > 99) return false;
      setAlpha(Alpha + 1);
    }
  };

  return (
    <AlphaValueContainer color={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          id="ic_invert_colors_24px"
          d="M17.66,7.93,12,2.27,6.34,7.93a8,8,0,1,0,11.32,0ZM12,19.59A6,6,0,0,1,7.76,9.35L12,5.1Z"
          transform="translate(-2 -2.27)"
        />
      </svg>

      <input
        type="range"
        value={Alpha}
        min="1"
        max="100"
        step="1"
        onChange={(e) => {
          setAlpha(e.target.valueAsNumber);
        }}
        onWheel={whieelEventBindAlpha}
        ref={alphaRangeRef}
        id="lineWidth"
      />
    </AlphaValueContainer>
  );
}

export default AlphaValue;
