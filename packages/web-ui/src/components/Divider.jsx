import styled from 'styled-components';

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => (theme.GREY)};
  margin: 4em;
`;
Divider.displayName = 'Divider';

export default Divider;
