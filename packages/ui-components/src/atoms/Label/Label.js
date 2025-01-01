import styled from 'styled-components';
import { GenericTextStyle } from '../styles';

export const Label = styled.label`
  user-select: none;
  opacity: 0.5;
  align-items: ${({ rightLabel }) => (rightLabel ? 'center' : 'flex-start')};
  justify-content: ${({ rightLabel }) => (rightLabel ? 'flex-end' : 'flex-start')};
  height: ${({ rightLabel }) => (rightLabel ? '40px' : 'unset')};
  display: ${({ inline, rightLabel }) => (inline ? 'inline' : rightLabel ? 'flex' : 'block')};
  margin-right: ${({ inline }) => (inline ? '16px' : '0')};
  margin-left: ${({ inline }) => (inline ? '24px' : '0')};
  margin-bottom: ${({ rightLabel }) => (rightLabel ? 0 : '14px')};
  white-space: ${({ noWrap, rightLabel }) => (noWrap || rightLabel ? 'nowrap' : 'unset')};

  ${GenericTextStyle}
`;

Label.displayName = 'Label';
