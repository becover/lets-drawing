import React from 'react';
import Login from '../../../routes/Login';

function LoginButton({ onModal }) {
  const onLoginModal = () => {
    onModal(true, Login);
  };
  return (
    <div onClick={onLoginModal}>
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
      >
        <path
          d="M10.5 7.5l-3 3.25m3-3.25l-3-3m3 3H1m6-6h6.5v12H7"
          stroke="currentColor"
        ></path>
      </svg>
    </div>
  );
}

export default LoginButton;
