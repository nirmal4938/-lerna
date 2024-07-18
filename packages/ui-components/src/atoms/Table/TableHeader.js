import styled from 'styled-components';

export const TableHeader = styled.th`
  border-bottom: 2px solid ${({ theme }) => (theme.LIGHT_GREY)};
  font-weight: bold;
  text-align: left;
  padding: 10px 16px;
`;

TableHeader.displayName = 'TableHeader';
