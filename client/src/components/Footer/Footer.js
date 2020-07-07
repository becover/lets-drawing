import React from 'react';

function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        paddingBottom: '12px',
        background: 'rgba(12, 145, 215, 0.68)',
        color: 'rgba(255, 255, 255, 0.6)',
        borderTop: '12px solid rgba(95, 136, 217, 0.7)',
        // borderBottom: '10px solid #0075ff',
      }}
    >
      <p
        style={{
          position: 'absolute',
          top: '-100%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Happy drawing! :)
      </p>
    </div>
  );
}

export default Footer;
