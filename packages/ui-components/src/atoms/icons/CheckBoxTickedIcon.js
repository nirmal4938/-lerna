import React from 'react';
import styled from 'styled-components';

const Path = styled.path`
  transition: all 0.1s ease-in-out;
`;

export const CheckBoxTickedIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <Path fillRule="evenodd" d="M13.256.744c.41 0 .762.147 1.055.44.293.293.439.65.439 1.072V12.75c0 .41-.146.762-.44 1.055-.292.293-.644.44-1.054.44H2.744c-.41 0-.762-.147-1.055-.44a1.438 1.438 0 0 1-.439-1.055V2.256c0-.422.146-.78.44-1.072.292-.293.644-.44 1.054-.44h10.512zm-6.75 10.512l6.75-6.75L12.2 3.434 6.506 9.129l-2.707-2.69-1.055 1.055 3.762 3.762z" />
    </svg>
);
