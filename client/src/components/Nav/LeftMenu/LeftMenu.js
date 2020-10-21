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

function LeftMenu({ onSettingButton }) {
  return (
    <LeftMenuContain>
      <ul>
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
        <li>
          <SaveImage onSettingButton={onSettingButton} />
        </li>
        <li>
          <LoadImage onSettingButton={onSettingButton} />
        </li>
      </ul>
    </LeftMenuContain>
  );
}

export default LeftMenu;
