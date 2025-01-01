import styled from 'styled-components';
import { Card } from '../Card';

export const ListRow = styled(Card)`
  margin-top: 6px;
  box-sizing: border-box;
  padding: 0 16px;
  display: flex;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'auto')};
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => (props.secondary ? props.theme.BG_GREY : props.theme.WHITE)};
  border: 2px solid ${(props) => (props.active ? `${props.theme.CTA_COLOR}b8` : 'transparent')};

  height: 42px;

  &:nth-child(2) {
    margin-top: 0;
  }
`;
