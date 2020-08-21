import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const ColorListContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 500px;

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
`;

function Colors({ onChangeColor, textModeAlpha, canvasMode }) {
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

  const onClickColor = (e) => {
    const color = e.target.style.backgroundColor;
    console.group('color log');
    console.log(color);
    if (canvasMode === 'text') {
      const [, colorStruc] = color.split('(');
      const [colorNumbers] = colorStruc.split(')');
      let [r, g, b, a = textModeAlpha / 100] = colorNumbers.split(',');
      a = textModeAlpha / 100;
      console.log(`rgba(${r},${g},${b},${a})`);
      console.groupEnd('color log');
      return onChangeColor(`rgba(${r},${g},${b},${a})`);
    }
    onChangeColor(color);
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
    <ColorListContainer>
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
