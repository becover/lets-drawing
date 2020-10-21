import React from 'react';
import LoginButton from './LoginButton';
import styled from 'styled-components';

const RightMenuContain = styled.div`
  cursor: pointer;
  svg {
    fill: #05baf5;
  }
`;

function RightMenu({ onModal }) {
  return (
    <RightMenuContain>
      <LoginButton onModal={onModal} />
    </RightMenuContain>
  );
}

export default RightMenu;
