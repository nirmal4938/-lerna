import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background: #f44336;

  &:hover {
    background: #d32f2f;
  }
`;

const AddEditPlayer = ({ player = {}, onChange, onAdd }) => {
  const [formData, setFormData] = useState({
    name: player?.name || "",
    role: player?.role || "",
    batting_style: player?.batting_style || "",
    bowling_style: player?.bowling_style || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (onChange) onChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.batting_style || !formData.bowling_style) {
      alert("Please fill all required fields.");
      return;
    }
    onAdd(formData);
    setFormData({
      name: "",
      role: "",
      batting_style: "",
      bowling_style: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Player Name"
        required
      />
      <Select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="Batsman">Batsman</option>
        <option value="Bowler">Bowler</option>
        <option value="All-Rounder">All-Rounder</option>
        <option value="Wicket-Keeper">Wicket-Keeper</option>
      </Select>
      <Select
        name="batting_style"
        value={formData.batting_style}
        onChange={handleChange}
        required
      >
        <option value="">Select Batting Style</option>
        <option value="Right-Handed">Right-Handed</option>
        <option value="Left-Handed">Left-Handed</option>
      </Select>
      <Select
        name="bowling_style"
        value={formData.bowling_style}
        onChange={handleChange}
        required
      >
        <option value="">Select Bowling Style</option>
        <option value="Off Spin">Off Spin</option>
        <option value="Leg Spin">Leg Spin</option>
        <option value="Fast">Fast</option>
        <option value="Medium">Medium</option>
        <option value="None">None</option>
      </Select>
      <ButtonGroup>
        <Button type="submit">Save Player</Button>
        <CancelButton type="button" onClick={() => onChange(null)}>
          Cancel
        </CancelButton>
      </ButtonGroup>
    </Form>
  );
};

export default AddEditPlayer;
