import React from 'react';

export default function LogoutButton({ onAuth }) {
  return (
    <div
      onClick={() => {
        onAuth('isAuth', false);
        onAuth('username', null);
        onAuth('password', null);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          id="ic_exit_to_app_24px"
          d="M10.09,15.59,11.5,17l5-5-5-5L10.09,8.41,12.67,11H3v2h9.67ZM19,3H5A2,2,0,0,0,3,5V9H5V5H19V19H5V15H3v4a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
          transform="translate(-3 -3)"
        />
      </svg>
    </div>
  );
}