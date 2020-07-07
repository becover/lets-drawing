import React from 'react';
import Login from './Login';
import styled from 'styled-components';

const RightMenuContain = styled.div`
  svg {
    fill: #05baf5;
  }
`;

function RightMenu() {
  return (
    <RightMenuContain>
      <Login />
    </RightMenuContain>
  );
}

export default RightMenu;
