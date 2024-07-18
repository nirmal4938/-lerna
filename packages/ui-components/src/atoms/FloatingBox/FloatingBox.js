import styled from 'styled-components';
import { FloatingBoxText } from '.';
import PropTypes from 'prop-types';

export const FloatingBox = styled.div`
  padding: 10px 10px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ secondary, theme }) => (secondary ? theme.BLACK : '#ffffff')};
  box-shadow: 0 0 12px 0 rgba(2, 2, 2, 0.11);
  position: absolute;
  right: ${({ right }) => (right ? '0' : 'unset')};
  overflow-y: auto;
  outline: none;
  z-index: 100;

  &:after {
    bottom: 100%;
    right: 10%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 10px;
  }
`;

FloatingBox.displayName = 'FloatingBox';

FloatingBox.defaultProps = {
  width: 'auto',
  height: 'auto',
};

FloatingBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  right: PropTypes.bool,
  secondary: PropTypes.bool,
  theme: PropTypes.object,
};

// export default FloatingBox;
