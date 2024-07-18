import styled from 'styled-components';

const AppBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.BG_GREY};
`;
AppBackground.displayName = 'AppBackground';

export default AppBackground;
