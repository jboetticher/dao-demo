import React, { useState } from 'react';
import styled from 'styled-components';

const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  & > * {
    margin: 8px 0;
  }
`;

const StyledCheckItem = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 30px; /* Make room for the custom checkbox */

  &:hover::after {
    border: 2px solid magenta;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    border: 2px solid white;
    background: transparent;
    transition: all 0.3s ease;
  }
`;


const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked + ${StyledCheckItem}::after {
    background: magenta;
    border: 2px solid white;
  }
`;

const Checklist = ({ options, onChange }) => {
    const [selections, setSelections] = useState({});
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      const newSelections = { ...selections, [name]: checked };
      setSelections(newSelections);
      onChange(newSelections);
    };
  
    return (
      <ChecklistContainer>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <StyledInput
              id={option}
              type="checkbox"
              name={option}
              onChange={handleCheckboxChange}
            />
            <StyledCheckItem htmlFor={option}>{option}</StyledCheckItem>
          </React.Fragment>
        ))}
      </ChecklistContainer>
    );
  };

export default Checklist;
