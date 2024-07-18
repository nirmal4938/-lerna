import styled from 'styled-components';
import GenericTextStyle from '../../atoms/styles/GenericTextStyle';

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.ERROR_COLOR};

  ${GenericTextStyle}
`;
