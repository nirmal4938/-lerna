import React from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  width: 44px;
  height: 22px;
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 100px;
  outline: none;
  transition: all 0.1s ease-in-out;
  background-color: ${({ checked, theme }) => (checked ? theme.CTA_GREEN : theme.GREY)};
  
  &:hover>div, :focus>div {
    box-shadow: 0 0 12px 0 rgba(90, 90, 90, 0.26);
  }
`;

Slider.displayName = 'Slider';

const Knob = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  transition: all 0.2s ease-in-out;
  bottom: -1px;
  left: ${({ checked }) => (checked ? '21px' : '-2px')};
  position: absolute;

  box-shadow: 0 0 5px 0 rgba(211, 209, 209, 0.5);
  background-color: ${({ theme }) => theme.BG_GREY};
`;

Knob.displayName = 'Knob';

export const ToggleComponent = ({ checked, ...props }) => (
    <Slider tabIndex={0} {...props} checked={checked}>
        <Knob checked={checked} />
    </Slider>
);
