export default `
  height: 40px;
  outline: none;
  border: solid 1px #e1e0e0;
  box-sizing: border-box;
  transition: border-color .3s ease-in-out;
  padding: 11px 16px 12px 16px;
  border-radius: 4px;
  background-color: white;

  &::placeholder {
    color: #454543;
    opacity: 0.5;
  }
  
  &:not([disabled]):hover, &:not([disabled]):focus {
    border: solid 1px #454543;
  }

  &[disabled] {
    background-color: #f3f3f3;
  }
`;
