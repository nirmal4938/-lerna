import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericTextStyle from '../styles/GenericTextStyle';

const evaluateBackgroundColor = ({ theme, active, selected }) => {
  if (active) {
    return theme.BG_GREY;
  }
  if (selected) {
    return theme.GREY;
  }
  return theme.WHITE;
};

const evaluateColor = ({ theme }) => theme.BLACK;

const evaluateHoverBackgroundColor = ({ theme, selected }) => {
  if (selected) {
    return theme.BG_GREY_HOVER;
  }
  return theme.BG_GREY;
};

const evaluateDisabledAttributes = ({ theme, disabled, selected }) => {
  if (disabled) {
    return '';
  }

  return `
    cursor: pointer;

    &:hover {
      background-color: ${evaluateHoverBackgroundColor({ theme, selected })};
    }
  `;
};

const StyledFloatingBoxItem = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  transition: all 0.1s ease-in-out;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  background-color: ${evaluateBackgroundColor};
  color: ${evaluateColor};
  left: 0;
  right: 0;
  outline: none;
  user-select: none;

  ${GenericTextStyle}

  font-size: 14px;

  ${evaluateDisabledAttributes}
`;

StyledFloatingBoxItem.displayName = 'FloatingBoxItem';

const IconWrapper = styled.div`
  margin-right: 10px;
  height: 16px;
`;

IconWrapper.displayName = 'IconWrapper';

export const FloatingBoxItem = React.forwardRef(({ icon, children, ...props }, ref) => (
  <StyledFloatingBoxItem tabIndex={-1} ref={ref} {...props}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {children}
  </StyledFloatingBoxItem>
));

FloatingBoxItem.propTypes = {
  active: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  id: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.object,
};

FloatingBoxItem.defaultProps = {
  active: false,
  selected: false,
  disabled: false,
  icon: null,
  id: null,
  onClick: null,
  children: null,
  style: {},
};

export default FloatingBoxItem;
