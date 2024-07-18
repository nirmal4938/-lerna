import styled from 'styled-components';

 const Fields = styled.div`
  display: flex;
  width: 100%;
  margin-left: ${({ negative }) => (negative ? '-28px' : 0)};
  margin-right: ${({ negative }) => (negative ? '-28px' : 0)};
`;
Fields.displayName = 'Fields';
export default Fields;
