import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const ColorListContainer = styled.div`
  width: 50%;
  min-width: 215px;
  max-width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 787px) and (max-width: 900px) {
    width: auto;
    display: inline-flex;
  }

  @media only screen and (max-width: 786px) {
    ${(props) => props.foldTools && 'display:none;'}
  }
`;

const ColorList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  margin-right: 10px;

  li {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 0 3px rgba(0, 0, 0, 0.1);

    svg {
      position: absolute;
      fill: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:nth-of-type(2) svg {
      fill: #000;
    }
  }
  @media only screen and (max-width: 900px) {
    & {
      width: 150px;
      min-width: 150px;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    li {
      width: 30px;
      height: 30px;
      border-radius: 0;
      box-shadow: 0 0 gray;
    }
  }
  @media only screen and (max-width: 786px) {
    margin-top: 8px;
    width: 200px;
    margin-right: 15px;
    li {
      width: calc(200px / 5);
      height: calc(160px / 5);
    }
  }
`;

function Colors({ onChangeColor, textModeAlpha, canvasMode, foldTools }) {
  const colors = [
    {
      color: 'rgba(51, 51, 51, 1)',
      clicked: true,
    },
    {
      color: 'rgba(255, 255, 255, 1)',
      clicked: false,
    },
    {
      color: 'rgba(255, 31, 9, 1)',
      clicked: false,
    },
    {
      color: 'rgba(255, 126, 15, 1)',
      clicked: false,
    },
    {
      color: 'rgba(255, 223, 0, 1)',
      clicked: false,
    },
    {
      color: 'rgba(34, 206, 22, 1)',
      clicked: false,
    },
    {
      color: 'rgba(11, 197, 226, 1)',
      clicked: false,
    },
    {
      color: 'rgba(22, 33, 167, 1)',
      clicked: false,
    },
    {
      color: 'rgba(122, 33, 220, 1)',
      clicked: false,
    },
    {
      color: 'rgba(255, 21, 172, 1)',
      clicked: false,
    },
  ];

  const [Colors, setColors] = useState(colors);

  const handleRgbRegex = (color) => {
    const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    if (rgbRegex.test(color)) {
      // eslint-disable-next-line
      const [_, r, g, b] = color.match(rgbRegex);
      const ALPHA = textModeAlpha / 100;
      return onChangeColor(`rgba(${r},${g},${b},${ALPHA})`);
    } else if (rgbaRegex.test(color)) {
      // eslint-disable-next-line
      const [_, r, g, b, a] = color.match(rgbaRegex);
      const ALPHA = textModeAlpha / 100;
      return onChangeColor(`rgba(${r},${g},${b},${ALPHA})`);
    }
  };

  const onClickColor = (e) => {
    if (e.target && e.target.tagName === 'LI') {
      const color = e.target.style.backgroundColor;
      canvasMode === 'text' && handleRgbRegex(color);
      onChangeColor(color);
    }
  };

  const CheckdIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.6"
      height="13.4"
      viewBox="0 0 17.6 13.4"
    >
      <path
        id="ic_done_24px"
        d="M9,16.2,4.8,12,3.4,13.4,9,19,21,7,19.6,5.6Z"
        transform="translate(-3.4 -5.6)"
      />
    </svg>
  );

  const onClick = useCallback(
    (index) => {
      setColors(
        Colors.map((color, idx) =>
          idx === index
            ? { ...color, clicked: true }
            : { ...color, clicked: false },
        ),
      );
    },
    [Colors],
  );
  return (
    <ColorListContainer foldTools={foldTools}>
      <ColorList onClick={onClickColor}>
        {Colors.map((color, index) => (
          <li
            key={index}
            style={{ background: color.color }}
            onClick={() => onClick(index)}
          >
            {color.clicked ? <CheckdIcon /> : ''}
          </li>
        ))}
      </ColorList>
    </ColorListContainer>
  );
}

export default Colors;
