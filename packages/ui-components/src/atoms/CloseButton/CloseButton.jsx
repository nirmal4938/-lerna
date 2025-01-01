import React from 'react';
import styled from 'styled-components';

import { CloseIcon } from '../icons';

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px;
  margin: 14px;
  z-index: 100;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  & g {
    transition: all 0.1s ease-in-out;
  }

  &:hover g {
    fill: ${({ theme }) => theme.CTA_COLOR} !important;
  }
`;


const CloseButton = (props) => (
  <CloseButtonContainer {...props}>
    <CloseIcon />
  </CloseButtonContainer>
);

export default CloseButton;
