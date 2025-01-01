import React from 'react';

export const ChevUp = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <path id="a" d="M0 0h16v16H0z" />
    </defs>
    <path
      fill="#454543"
      fillRule="nonzero"
      d="M7.41 6.355h1.18l-4.167 3.968a.863.863 0 0 1-1.179 0 .767.767 0 0 1 0-1.122l4.167-3.969a.863.863 0 0 1 1.178 0l4.167 3.969a.767.767 0 0 1 0 1.122.863.863 0 0 1-1.179 0L7.411 6.355z"
    />
  </svg>
);

ChevUp.defaultProps = {
  width: 16,
  height: 16,
};
