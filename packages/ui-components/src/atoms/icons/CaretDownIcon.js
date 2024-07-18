import React from 'react';
// import { SVGComponent } from './SvgProps';

export const CaretDownIcon = ({ color, ...props }) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    {...props}
    viewBox="0 0 24 24"
    enableBackground="new 0 0 24 24"
    xmlSpace="preserve"
  >
    <path fill={color} d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
    <path fill="none" d="M0,0h24v24H0V0z" />
  </svg>
);

CaretDownIcon.defaultProps = {
  width: 24,
  height: 24,
  color: 'white',
};
