import styled from 'styled-components';

const ComponentBar = styled.div`
  height: 80px;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.BG_GREY};
`;

ComponentBar.displayName = 'ComponentBar';

export default ComponentBar;
