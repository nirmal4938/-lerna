import styled from 'styled-components';
import { StyledButton } from '../Button';

export const Buttons = styled.div`
  display: flex;

  ${StyledButton} {
    margin-right: 16px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
Buttons.displayName = 'Buttons';
