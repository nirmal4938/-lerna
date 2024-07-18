// packages/ui-components/src/components/Field/Field.js

import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Field = styled.div`
  padding-bottom: ${({ fluid, flex }) => (fluid && flex ? '0' : '20px')};
  padding-left: ${({ fluid, rightLabel, first }) => {
    if (fluid || rightLabel) return '0';
    return first ? '0' : '28px';
  }};
  padding-right: ${({ fluid, rightLabel, last }) => {
    if (fluid || rightLabel) return '0';
    return last ? '0' : '28px';
  }};
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  justify-content: ${({ right }) => (right ? 'flex-end' : 'flex-start')};
  box-sizing: border-box;
  width: 100%;
  position: relative;
`;

Field.propTypes = {
  fluid: PropTypes.bool,
  flex: PropTypes.bool,
  rightLabel: PropTypes.bool,
  right: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
};

// export default Field;
