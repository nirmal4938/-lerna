import { Text } from 'ui-components';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 28px;
  cursor: pointer;
  background-color: ${({ theme, active }) => (active ? theme.CTA_COLOR : theme.WHITE)};

  &:hover {
    background-color: ${({ theme, active }) => (active ? theme.CTA_COLOR : 'rgba(0,0,0,0.05)')};
  }
`;
Wrapper.displayName = 'Wrapper';

export default ({ item, active }) => (
  <Wrapper onClick={item.action} active={active}>
    <Text style={{ color: active ? 'white' : 'black' }}>{item.text}</Text>
  </Wrapper>
);
