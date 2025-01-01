import React from 'react';

export const ChevLeft = (props) => (
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
      fillRule="nonzero"
      fill={props.color}
      d="M6.8 7.41v1.18l3.968-4.167a.863.863 0 0 0 0-1.179.767.767 0 0 0-1.123 0L5.677 7.411a.863.863 0 0 0 0 1.178l3.968 4.167a.767.767 0 0 0 1.123 0 .863.863 0 0 0 0-1.179L6.799 7.411z"
    />
  </svg>
);

ChevLeft.defaultProps = {
  width: 16,
  height: 16,
  color: 'grey',
};
