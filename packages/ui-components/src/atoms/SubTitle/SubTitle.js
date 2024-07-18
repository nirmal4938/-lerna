import styled from 'styled-components';

export const SubTitle = styled.h2`
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  margin: 0;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ active, theme }) => (active ? theme.CTA_COLOR : theme.BLACK)};
`;

SubTitle.defaultProps = {
  fontSize: '18px',
  active: false,
};

SubTitle.displayName = 'SubTitle';
