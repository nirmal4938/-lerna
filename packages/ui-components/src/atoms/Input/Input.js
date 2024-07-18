// packages/ui-components/src/components/Input/Input.js

import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput';
import AndroidMaskedInput from 'react-text-mask';
import styled from 'styled-components';
import GenericInputStyle from '../styles/GenericInputStyle';
import GenericTextStyle from '../styles/GenericTextStyle';
import { SearchIcon } from '../icons/SearchIcon';

const InnerInput = styled.input`
  ${GenericTextStyle}
  ${GenericInputStyle}
  width: 100%;

  border: solid 1px ${({ error }) => (error ? 'red' : '#e1e0e0')};

  &:not([disabled]):hover, &:not([disabled]):focus {
    border: solid 1px ${({ error }) => (error ? 'darkred' : '#454543')};
  }
`;

const MaskedStyledInput = styled(MaskedInput)`
  ${GenericTextStyle}
  ${GenericInputStyle}
  width: 100%;
`;

const AndroidMaskedStyledInput = styled(AndroidMaskedInput)`
  ${GenericTextStyle}
  ${GenericInputStyle}
  width: 100%;
`;

InnerInput.displayName = 'Input';

const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

InputWrap.displayName = 'InputWrap';

const SearchIconWrap = styled.div`
  position: absolute;
  right: 10px;
`;

SearchIconWrap.displayName = 'SearchIconWrap';

const darkenHover = ({ buttonColor, theme }) => {
  if (buttonColor) {
    try {
      return color(buttonColor).darken(0.04).rgb().string();
    } catch (e) {
      // No problem here.
    }
  }

  return theme.CTA_COLOR_HOVER;
};

const IconButtonWrap = styled.div`
  position: absolute;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 38px;
  height: 38px;
  transition: background-color 0.05s linear;
  background-color: ${({ buttonColor, theme }) => buttonColor || theme.CTA_COLOR};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 1px solid ${({ theme }) => theme.GREY};

  &:hover {
    background-color: ${darkenHover};
  }
`;

IconButtonWrap.displayName = 'IconButtonWrap';

const InputComponent = ({
  search,
  android,
  wrapperStyle,
  buttonIcon: ButtonIcon,
  buttonColor,
  buttonOnClick,
  error,
  ...props
}) => (
  <InputWrap style={wrapperStyle} className="input-wrapper">
    {props.mask ? (
      android ? (
        <AndroidMaskedStyledInput
          {...props}
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
      ) : (
        <MaskedStyledInput {...props} />
      )
    ) : (
      <InnerInput error={error} search={search} {...props} />
    )}
    {search && (
      <SearchIconWrap>
        <SearchIcon />
      </SearchIconWrap>
    )}
    {ButtonIcon && (
      <IconButtonWrap buttonColor={buttonColor} onClick={buttonOnClick}>
        <ButtonIcon width={26} height={26} />
      </IconButtonWrap>
    )}
  </InputWrap>
);

InputComponent.propTypes = {
  search: PropTypes.bool,
  android: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  buttonIcon: PropTypes.elementType,
  buttonColor: PropTypes.string,
  quickAdjust: PropTypes.bool,
  error: PropTypes.bool,
  mask: PropTypes.string,
  buttonOnClick: PropTypes.func,
};

InputComponent.defaultProps = {
  search: false,
  android: false,
  wrapperStyle: {},
  buttonIcon: null,
  buttonColor: '',
  quickAdjust: false,
  error: false,
  mask: '',
  buttonOnClick: () => {},
};

InputComponent.displayName = 'Input';

export default InputComponent;
