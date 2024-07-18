// packages/ui-components/src/components/Label/Label.js

import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericTextStyle from '../../atoms/styles/GenericTextStyle';

const Label = styled.label`
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

Label.propTypes = {
  rightLabel: PropTypes.bool,
  inline: PropTypes.bool,
  noWrap: PropTypes.bool,
};

export default Label;