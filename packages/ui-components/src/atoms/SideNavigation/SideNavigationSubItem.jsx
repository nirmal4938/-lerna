import React from 'react';
import styled from 'styled-components';
import { ChevRight } from '../icons';

const SubItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  color: white;
  cursor: pointer;
  padding-left: 22px;
  padding-right: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
  background-color: ${({ active }) => (active ? 'rgba(0,0,0,0.1)' : 'transparent')};
  transition: background-color .1s ease-in-out;
  font-size: 14px;
  border-top: ${({ first }) => (first ? '1px solid rgba(0,0,0,0.15)' : 'unset')};

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`;

SubItem.displayName = 'SubItem';

export const SideNavigationSubItem = ({ children, ...props }) => (
  <SubItem {...props}>
    {children}
    <ChevRight color="rgba(255,255,255,0.6)" />
  </SubItem>
);

