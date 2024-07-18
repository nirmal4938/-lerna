import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledMainContent = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: ${({ collapsed }) => (collapsed ? '60px' : '196px')};
  box-sizing: border-box;
`;

const MainContentScroll = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: auto;
`;

export const MainContent = ({ children, collapsed }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const curr = ref.current;

    curr.scrollTop = 0;
  }, [children]);
  return (
    <StyledMainContent className="chicken" collapsed={collapsed}>
      <MainContentScroll ref={ref} className="tendies">
        {children}
      </MainContentScroll>
    </StyledMainContent>
  );
};
