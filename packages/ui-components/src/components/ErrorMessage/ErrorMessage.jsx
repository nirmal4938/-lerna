import styled from 'styled-components';
import GenericTextStyle from '../../atoms/styles/GenericTextStyle';

const Error = styled.span`
  color: ${({ theme }) => theme.ERROR_COLOR};
  top: 0;
  right: 28px;
  position: absolute;

  ${GenericTextStyle}
`;

Error.displayName = 'Error';

export default Error;
