import { GenericTextStyle } from '../styles';
import React from 'react';
import styled from 'styled-components';

const CloseIconMUI = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 24 24" fill="#222222" style={{ verticalAlign: 'middle' }}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const borderRadius = 4;

const Fader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.1s linear;
  border-radius: ${borderRadius - 1}px;
  pointer-events: none;
`;

export const ChipComponent = styled.span`
  ${GenericTextStyle}

  color: ${({ textColor }) => (textColor || 'inherit')};
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 3px 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: ${borderRadius}px;
  background-color: ${({ color }) => color};
  cursor: ${({ onClick, onDelete }) => (onClick || onDelete ? 'pointer' : 'auto')};
  margin-right: 6px;
  font-size: 14px;

  ${({ onClick }) => (onClick ? `
    &:hover ${Fader} {
      background-color: rgba(0, 0, 0, 0.1);
    }
  ` : '')}
`;

const IconWrapper = styled.div`
  display: inline-flex;
  height: 16px;
  width: 16px;
  cursor: pointer;
  margin: 0 2px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 5;
  transition: background-color 0.1s linear;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Chip = ({
  children, onClick, onDelete, color, textColor, style, className,
}) => (
  <ChipComponent color={color} textColor={textColor} onClick={onClick} style={style} className={className}>
    <strong>{children}</strong>
    <Fader />
    {onDelete && (
      <IconWrapper onClick={onDelete}>
        <CloseIconMUI />
      </IconWrapper>
    )}
  </ChipComponent>
);
