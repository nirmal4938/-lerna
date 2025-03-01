import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &.save {
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.cancel {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #a71d2a;
    }
  }
`;

const ActionButtons = () => {
  return (
    <ButtonContainer>
      <Button className="save">Save & Next</Button>
      <Button className="cancel">Cancel</Button>
    </ButtonContainer>
  );
};

export default ActionButtons;
