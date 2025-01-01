import React from 'react';

export const ChevDown = (props) => (
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
      d="M7.41 9.2h1.18L4.422 5.233a.863.863 0 0 0-1.179 0 .767.767 0 0 0 0 1.123l4.167 3.968c.325.31.853.31 1.178 0l4.167-3.968a.767.767 0 0 0 0-1.123.863.863 0 0 0-1.179 0L7.411 9.201z"
    />
  </svg>
);

ChevDown.defaultProps = {
  width: 16,
  height: 16,
};
