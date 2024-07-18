import React from 'react';
// import { SVGComponent } from './SvgProps';

export const ChevRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <defs>
      <path id="a" d="M0 0h16v16H0z" />
    </defs>
    <path fillRule="nonzero" fill={props.color} d="M9.2 7.41v1.18L5.233 4.422a.863.863 0 0 1 0-1.179.767.767 0 0 1 1.123 0l3.968 4.167c.31.325.31.853 0 1.178l-3.968 4.167a.767.767 0 0 1-1.123 0 .863.863 0 0 1 0-1.179l3.969-4.166z" />
  </svg>
);

ChevRight.defaultProps = {
  width: 16,
  height: 16,
  color: 'grey',
};
