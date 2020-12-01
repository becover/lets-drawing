import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LogoutButton({ onLogout }) {
  const history = useHistory();

  return (
    <div
      onClick={() => {
        onLogout();
        localStorage.removeItem('dw-token');
        localStorage.removeItem('dw-user');
        history.push('/');
      }}
    >
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
      >
        <path
          d="M13.5 7.5l-3 3.25m3-3.25l-3-3m3 3H4m4 6H1.5v-12H8"
          stroke="currentColor"
        ></path>
      </svg>
    </div>
  );
}
