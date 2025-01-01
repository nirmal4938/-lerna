import styled from 'styled-components';

const ListButtons = styled.div`
  height: ${(props) => (props.head ? '58px' : '75px')};
  margin-top: ${(props) => (props.head ? '0' : '10px')};
  flex-grow: 0;
  flex-basis: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

ListButtons.displayName = 'ListButtons';

export default ListButtons;