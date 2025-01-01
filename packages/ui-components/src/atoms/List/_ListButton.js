import React from 'react';
import styled, { withTheme } from 'styled-components';

const evaluateBackgroundColor = ({ theme, secondary, disabled }) => {
    if (disabled) return theme.GREY_DISABLED;

    if (secondary) return theme.WHITE;

    return theme.CTA_COLOR;
};

const evaluateHoverBackgroundColor = ({ theme, secondary, disabled }) => {
    if (disabled) return theme.GREY_DISABLED;

    if (secondary) return theme.WHITE_HOVER;

    return theme.CTA_COLOR_HOVER;
};

const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};

  width: 36px;
  height: 36px;

  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${evaluateBackgroundColor};

  &:hover {
    background-color: ${evaluateHoverBackgroundColor};
  }
`;
ListButton.displayName = 'ListButton';

const ListButtonComponent = ({
    icon: Icon, secondary, disabled, theme, ...props
}) => (
    <ListButton disabled={disabled} secondary={secondary} {...props}>
        <Icon
            width="30"
            height="30"
            color={
                disabled
                    ? theme.LIGHT_GREY
                    : secondary
                        ? theme.LIGHT_GREY
                        : theme.WHITE
            }
        />
    </ListButton>
);

export default withTheme(ListButtonComponent);
