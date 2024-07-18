import React from 'react';

export const BackArrow = ({ color, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 34 20">
    <path fill={color} fillRule="nonzero" d="M3.845 10.914h30.07v-2H3.775l7.429-7.507L9.783 0 .707 9.173l-.707.7.007.007L0 9.887l.707.7 9.076 9.172 1.422-1.406-7.36-7.439z" />
  </svg>
);

BackArrow.defaultProps = {
  width: 34,
  height: 20,
  color: '#1F6187',
};
