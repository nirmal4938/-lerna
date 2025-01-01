import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  & * {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.CTA_COLOR};
`;

export { StyledLink as Link };
