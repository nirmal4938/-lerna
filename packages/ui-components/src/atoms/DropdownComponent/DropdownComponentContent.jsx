import React from 'react';
import styled from 'styled-components';
import { ChevUp, ChevDown } from '../icons';
import { GenericNoWrapStyle } from '../styles';
import { Text } from '../Text';

const InputText = styled(Text)`
  ${GenericNoWrapStyle}
`;

InputText.displayName = 'InputText';

const ChevContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
  height: 16px;
`;

ChevContainer.displayName = 'ChevContainer';

export const DropdownComponentContent = ({ open, children }) => (
  <div>
    <InputText>{children}</InputText>
    <ChevContainer>{open ? <ChevUp /> : <ChevDown />}</ChevContainer>
  </div>
);
