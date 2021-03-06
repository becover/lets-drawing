import React from 'react';
import LoginButton from './LoginButton';
import styled from 'styled-components';
import LogoutButton from './LogoutButton';

const RightMenuContain = styled.div`
  cursor: pointer;
  &:hover {
    svg path {
      fill: coral;
    }
  }
  .greetings {
    display: inline-block;
    margin-right: 10px;
    font-weight: 500;
    color: #05baf5;
    vertical-align: baseline;
    span {
      display: inline-block;
      margin-left: 5px;
      vertical-align: baseline;
    }
  }
`;

function RightMenu({ onModal, isLogged, username, onLogout }) {
  return (
    <RightMenuContain>
      {isLogged ? (
        <>
          <span className="greetings">
            {username}
            <span role="img" aria-labelledby="smile">
              😊
            </span>
          </span>
          <LogoutButton {...{ onLogout }} />
        </>
      ) : (
        <LoginButton onModal={onModal} />
      )}
    </RightMenuContain>
  );
}

export default RightMenu;
