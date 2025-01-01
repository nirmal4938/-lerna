import styled from 'styled-components';
import { GenericInputStyle } from '../../atoms';

const CheckBoxGroup = styled.div`
  ${GenericInputStyle}
  height: unset;
  padding: 8px 10px;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    border: solid 1px #e1e0e0;
  }
`;

export default CheckBoxGroup;
