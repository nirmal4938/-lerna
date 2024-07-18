import styled from 'styled-components';
import GenericTextStyle from '../styles/GenericTextStyle';
import PropTypes from 'prop-types';

const evaluateTextAlign = ({ right, center }) => {
  if (right) return 'right';
  if (center) return 'center';
  return 'left';
};

export  const Text = styled.p`
  margin: 0;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ theme }) => theme.BLACK};
  text-align: ${evaluateTextAlign};
  ${GenericTextStyle}
`;

Text.displayName = 'Text';

Text.propTypes = {
  bold: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  theme: PropTypes.object,
};

// export default Text;
