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

function Colors({ onChangeColor }) {
  const colors = [
    {
      color: '#333',
      clicked: true,
    },
    {
      color: '#fff',
      clicked: false,
    },
    {
      color: '#ff1f09',
      clicked: false,
    },
    {
      color: '#ff7e0f',
      clicked: false,
    },
    {
      color: '#ffdf00',
      clicked: false,
    },
    {
      color: '#22ce16',
      clicked: false,
    },
    {
      color: '#0bc5e2',
      clicked: false,
    },
    {
      color: '#1621a7',
      clicked: false,
    },
    {
      color: '#7a21dc',
      clicked: false,
    },
    {
      color: '#ff15ac',
      clicked: false,
    },
  ];

  const [Colors, setColors] = useState(colors);

  const onClickColor = (e) => {
    onChangeColor(e.target.style.backgroundColor);
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
