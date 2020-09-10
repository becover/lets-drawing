import React from 'react';
import LeftMenu from '../components/Nav/LeftMenu/LeftMenu';
import Logo from '../components/Nav/Logo';
import styled from 'styled-components';
import RightMenu from '../components/Nav/RightMenu/RightMenu';

const NavigationContainer = styled.div`
  padding: 20px 20px;
  border-bottom: 10px solid rgba(87, 212, 191, 0.89);
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 13vh;
  box-sizing: border-box;

  &::after {
    content: '';
    width: 100%;
    height: 10px;
    display: block;
    background: #fff235bf /*#ccff3bbf #ffeb3bbf*/;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

function NavContainer() {
  return (
    <NavigationContainer>
      <LeftMenu />
      <Logo />
      <RightMenu />
    </NavigationContainer>
  );
}

export default NavContainer;
