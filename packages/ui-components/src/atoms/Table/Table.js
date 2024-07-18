import styled from 'styled-components';
import { InputWrapper } from '../../organisms/SearchAndSelect/SearchAndSelect';
// Assuming TableRow, InputWrapper, and Chip are imported from appropriate locations

const Table = styled.table`
  border-collapse: collapse;

  /* Styling for even rows */
  tbody > tr:nth-child(even) {
    background: #f8f6ff;
  }

  /* Styling for inputs and InputWrapper */
  input,
  ${InputWrapper} {
    background: transparent;
    border-color: #e1e0e0;
    border-width: 0;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-top-color: transparent;
    border-radius: 0;
    padding: 0;
    height: 40px;
    min-width: 175px;

    /* Focus and hover styles */
    &:not([disabled]):focus,
    &:not([disabled]):hover {
      border-color: #454543;
      border-width: 0;
      border-bottom-width: 1px;
      border-top-width: 1px;
      border-top-color: transparent;
      border-radius: 0;
    }
  }

  /* Styling for InputWrapper */
  ${InputWrapper} {
    padding-right: 24px;
  }

  /* Styling for input inside InputWrapper */
  ${InputWrapper} input {
    margin: 0;
    padding: 0;
  }
`;

Table.displayName = 'Table';

export default Table;
