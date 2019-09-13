import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div
      css={`
        display: flex;
        position: fixed;
        width: 100%;
        height: 100vh;
        margin: auto;
        align-items: center;
        justify-content: center;
        background: #00000061;
      `}
    >
      <ReactLoading
        type="spin"
        color="#fff"
        height="10%"
        width="10%"
      />
    </div>
  );
}
