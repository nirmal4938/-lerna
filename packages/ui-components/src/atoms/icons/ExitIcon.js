import React from 'react';
// import { SVGComponent } from './SvgProps';

export const ExitIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 28 28">
    <g fill="none" fillRule="evenodd">
      <g stroke={props.color} strokeWidth="1.2">
        <path d="M7.41 2H1v23h6.41M7.73 13.486l17.95-.059M19.898 7.497l1.944 1.945 3.89 3.889-3.89 3.89-1.944 1.944" />
      </g>
    </g>
  </svg>
);

ExitIcon.defaultProps = {
  width: 32,
  height: 32,
  color: '#fff',
};
