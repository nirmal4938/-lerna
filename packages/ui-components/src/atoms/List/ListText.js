import styled from 'styled-components';
import { GenericNoWrapStyle, GenericTextStyle } from '../styles';

// Styled component for ListText
export const ListText = styled.div`
  flex: 1;
  flex-grow: ${(props) => (props.basis ? '0' : props.grow || 1)};
  flex-basis: ${(props) => (props.basis || '0')};
  text-align: ${(props) => (props.right ? 'right' : 'left')};
  margin: 0;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  color: ${(props) => props.theme.BLACK};
  ${GenericTextStyle}
  ${GenericNoWrapStyle}
`;

// Default props for ListText
ListText.defaultProps = {
    grow: 1,
};
