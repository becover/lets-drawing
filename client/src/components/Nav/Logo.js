import React from 'react';
import logo from '../../assets/logo_letsdrawing.png';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const shining1 = keyframes`
  0% {
    opacity:0.2;
    width:8px;
    transform: translateX(-8px)
  }
  50%{
    opacity:0.4;
    width:6px;
  }
  100%{
    width:10px;
    opacity:0.2;
    transform: translateX(180px)
  }
`;

const shining2 = keyframes`
  0% {
    opacity:0.4;
    width:6px;
    transform: translateX(-6px)
  }
  50%{
    opacity:0.2;
    width:3px;
  }
  100%{
    width:8px;
    opacity:0.6;
    transform: translateX(180px)
  }
`;

const ImageBox = styled.div`
  span {
    position: relative;
  }
  span::after {
    content: '';
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    animation: ${shining1} 2s 4.5s infinite cubic-bezier(1, 0.21, 0.36, 0.93)
      backwards;
  }
  span::before {
    content: '';
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    animation: ${shining2} 1.4s 2.3s infinite
      cubic-bezier(0.64, 0.27, 0.47, 0.75) backwards;
  }

  img {
    width: 150px;
  }
`;

function Logo() {
  return (
    <ImageBox>
      <span>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </span>
    </ImageBox>
  );
}

export default Logo;
