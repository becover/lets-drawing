import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoadImage from './SystemMenu/LoadImage';
import SaveImage from './SystemMenu/SaveImage';

const LeftMenuContain = styled.div`
  li {
    display: inline-block;
    cursor: pointer;
  }
  li + li {
    margin-left: 10px;
  }
  svg {
    fill: #ffb866;
  }
`;

function LeftMenu({ onSettingButton, isAuth, onModal, location }) {
  return (
    <LeftMenuContain>
      <ul>
        {isAuth &&
          (location === '/' ? (
            <li>
              <Link to="/gallery">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    id="ic_dashboard_24px"
                    d="M3,13h8V3H3Zm0,8h8V15H3Zm10,0h8V11H13ZM13,3V9h8V3Z"
                    transform="translate(-3 -3)"
                  />
                </svg>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.003"
                  height="18.002"
                  viewBox="0 0 19.003 18.002"
                >
                  <path
                    id="ic_brush_24px"
                    d="M7,14a3,3,0,0,0-3,3,2.029,2.029,0,0,1-2,2,5.174,5.174,0,0,0,4,2,4,4,0,0,0,4-4A3,3,0,0,0,7,14ZM20.71,4.63,19.37,3.29a1,1,0,0,0-1.41,0L9,12.25,11.75,15l8.96-8.96A1,1,0,0,0,20.71,4.63Z"
                    transform="translate(-2 -2.998)"
                  />
                </svg>
              </Link>
            </li>
          ))}
        <li>
          <SaveImage {...{ onSettingButton, isAuth, onModal }} />
        </li>
        <li>
          <LoadImage onSettingButton={onSettingButton} />
        </li>
      </ul>
    </LeftMenuContain>
  );
}

export default LeftMenu;
