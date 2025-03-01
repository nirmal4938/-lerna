import React, { useState } from "react";
import styled from "styled-components";

const TabPanel = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <TabHeaders>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.header}
          </TabButton>
        ))}
      </TabHeaders>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const TabHeaders = styled.div`
  display: flex;
  background-color: #f7f7f7;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  border: none;
  background-color: ${({ active }) => (active ? "#4caf50" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#45a049" : "#ccc")};
  }
`;

const TabContent = styled.div`
  padding: 20px;
  background-color: white;
`;

export default TabPanel;
