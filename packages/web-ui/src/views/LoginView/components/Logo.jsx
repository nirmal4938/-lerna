import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Myriad Pro Bold', sans-serif;
  font-weight: 800;
  font-size: 2.26rem;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.CTA_COLOR};
`;
Wrapper.displayName = 'Wrapper';

export default () => (
  <Wrapper>
    Privacy Request
  </Wrapper>
);
