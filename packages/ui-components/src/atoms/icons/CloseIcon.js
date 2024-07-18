import React from 'react';
// import { SVGComponent } from './SvgProps';

export const CloseIcon = ({ color, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
    <g fill={color} fillRule="nonzero">
      <path d="M2.293 4L19.97 21.678l.707-.707L3 3.293z" />
      <path d="M19.97 3.293L2.294 20.97l.707.707L20.678 4z" />
    </g>
  </svg>
);

CloseIcon.defaultProps = {
  width: 24,
  height: 24,
  color: '#454543',
};
