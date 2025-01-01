import React from 'react';
import styled from 'styled-components';
import { GenericInputStyle } from '../styles';
import { DropdownComponentContent } from './DropdownComponentContent';

const StyledDropdownComponent = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  position: relative;
  width: 100%;
  ${GenericInputStyle}

  &:not([disabled]) {
    cursor: pointer;
  }
`;

StyledDropdownComponent.displayName = 'DropdownComponent';

export const DropdownComponent = ({ open, children, disabled, ...props }) => (
  <StyledDropdownComponent
    disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    {...props}
  >
    <DropdownComponentContent open={open}>{children}</DropdownComponentContent>
  </StyledDropdownComponent>
);
