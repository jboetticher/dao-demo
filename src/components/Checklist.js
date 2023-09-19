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
    border: 2px solid var(--orange);
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

  &[data-disabled="true"] {
    cursor: not-allowed;
    color: #CCC;

    &::after {
      border: 2px solid #CCC;
    }
  }

  /* Disable hover effect for disabled label */
  &:not([data-disabled="true"]):hover::after {
    border: 2px solid var(--orange);
  }
`;


const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked + ${StyledCheckItem}::after {
    background: var(--orange);
    border: 2px solid white;
  }

  /* Styles for disabled input */
  &:disabled + ${StyledCheckItem} {
    cursor: not-allowed;
    color: #CCC;

    &::after {
      border: 2px solid #CCC;
    }
  }
`;

const Checklist = ({ options, onChange, disabled }) => {
    const [selections, setSelections] = useState({});
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      const newSelections = { ...selections };
      
      if(checked) newSelections[name] = true;
      else if(newSelections[name]) delete newSelections[name];

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
              disabled={disabled?.includes(option)}
            />
            <StyledCheckItem htmlFor={option}>{option}</StyledCheckItem>
          </React.Fragment>
        ))}
      </ChecklistContainer>
    );
  };

export default Checklist;
