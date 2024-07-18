// packages/ui-components/src/components/Button/Button.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import PlusIcon from '../icons/PlusIcon';

/**
 * Given the theme and a style, returns an array containing background color,
 * background hover color, foreground color, and shadow.
 */
const color = ({
  theme,
  secondary,
  alert,
  error,
  disabled,
}) => {
  if (secondary) {
    return {
      background: disabled ? theme.BG_GREY : 'transparent',
      backgroundHover: 'transparent',
      foreground: disabled ? 'rgba(0,0,0,0.5)' : theme.BLACK,
      shadow: 'none',
    };
  }
  if (alert) {
    return {
      background: disabled ? theme.GREY : theme.CTA_COLOR_ALERT,
      backgroundHover: theme.CTA_COLOR_ALERT_HOVER,
      foreground: disabled ? 'rgba(0,0,0,0.5)' : theme.WHITE,
      shadow: disabled ? 'none' : '0 4px 18px 0 rgba(28, 84, 34, 0.25)',
    };
  }
  if (error) {
    return {
      background: disabled ? theme.GREY : theme.CTA_ERROR,
      backgroundHover: theme.CTA_ERROR,
      foreground: disabled ? 'rgba(0,0,0,0.5)' : theme.WHITE,
      shadow: disabled ? 'none' : '0 4px 18px 0 rgba(28, 84, 34, 0.25)',
    };
  }

  // Primary by default
  return {
    background: disabled ? theme.GREY : theme.CTA_COLOR,
    backgroundHover: theme.BTN_HOVER,
    foreground: disabled ? 'rgba(0,0,0,0.5)' : theme.WHITE,
    shadow: disabled ? 'none' : '0 4px 18px 0 rgba(28, 84, 34, 0.25)',
  };
};

const evaluateBackgroundColor = (props) => color(props).background;
const evaluateForegroundColor = (props) => color(props).foreground;
const evaluateBackgroundHoverColor = (props) => color(props).backgroundHover;
const evaluateShadow = (props) => color(props).shadow;

const evaluateWidth = ({ children, square, padded, fluid }) => {
  if (fluid) {
    return '100%';
  }

  if (!children || square) {
    return '44px';
  }

  if (padded) {
    return 'unset';
  }

  return '110px';
};

export const StyledButton = styled.button`
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  font-size: 14px;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  text-decoration: none;

  color: ${evaluateForegroundColor};
  background-color: ${evaluateBackgroundColor};
  border: ${({ secondary, theme }) => (secondary ? `solid 1px ${theme.GREY}` : 'none')};
  border-radius: ${({ round }) => (round ? '10000px' : '400000px')};
  outline: 0;
  box-shadow: ${evaluateShadow};

  width: ${evaluateWidth};
  height: ${({ short }) => (short ? '30px' : '44px')};
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  padding: ${({ padded }) => (padded ? '0 32px' : '0')};
  transition: all .3s ease-in-out, background .3s ease-in-out;

  &:not([disabled]):hover, &:not([disabled]):focus {
    background-color: ${evaluateBackgroundHoverColor};
    border: ${({ secondary, theme }) => (secondary ? `solid 1px ${theme.CTA_COLOR}` : 'none')};
    ${({ plain }) => (plain ? 'all: unset;' : '')}
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  }

  ${({ plain }) => (plain ? 'all: unset;' : '')}
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

StyledButton.displayName = 'Button';

const styles = { icon: { marginRight: '8px' } };

export const Button = ({ children, plus, padded, ...props }) => (
  <StyledButton {...props} padded={padded || plus}>
    {/* {plus && (
        <PlusIcon style={styles.icon} />
      )} */}
    {children}
  </StyledButton>
);

Button.propTypes = {
  secondary: PropTypes.bool,
  alert: PropTypes.bool,
  square: PropTypes.bool,
  disabled: PropTypes.bool,
  round: PropTypes.bool,
  short: PropTypes.bool,
  padded: PropTypes.bool,
  plus: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  fluid: PropTypes.bool,
  plain: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  secondary: false,
  alert: false,
  square: false,
  disabled: false,
  round: false,
  short: false,
  padded: false,
  plus: false,
  onClick: null,
  type: 'button',
  style: null,
  fluid: false,
  plain: false,
  children: null,
};

// export default Button;
