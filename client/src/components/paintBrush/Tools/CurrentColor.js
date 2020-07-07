import React from 'react';
import styled from 'styled-components';

const CurrentColorCotainer = styled.div`
  width: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5%;

  div {
    width: 100%;
    height: 50%;
    max-width: 50px;
    max-height: 50px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

function CurrentColor({ color }) {
  return (
    <CurrentColorCotainer>
      <div style={{ background: color }}></div>
    </CurrentColorCotainer>
  );
}

export default CurrentColor;
