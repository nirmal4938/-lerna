import styled from 'styled-components';



 export const Title = styled.h1`
  user-select: none;
  font-family: 'Arial', sans-serif;
  font-size: ${({ size = '24' }) => size}px;
  font-weight: bold;
  app-region: drag;
  cursor: default;
  line-height: 29px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.BLACK};
`;

Title.displayName = 'Title';
