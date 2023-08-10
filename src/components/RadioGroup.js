import React from 'react';
import styled from 'styled-components';

const RadioGroup = ({ options, name, onChange }) => {

  const handleRadioChange = (event) => {
    const { id } = event.target;
    onChange(id);
  };

  return (
    <RadioContainer>
      {options.map((option, index) => (
        <div key={index}>
          <StyledInput id={option} type="radio" name={name} value={option} onChange={handleRadioChange} />
          <StyledLabel htmlFor={option}>{option}</StyledLabel>
        </div>
      ))}
    </RadioContainer>
  )
};

export default RadioGroup;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;

  & > div {
    margin: 8px 0;
  }
`;

export const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding-left: 30px;
  color: white;
  font-weight: bold;
  
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
    border-radius: 50%;
    border: 2px solid white;
    background: transparent;
    transition: all 0.3s ease;
  }
`;

export const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked + ${StyledLabel}::after {
    background: var(--orange);
    border: 2px solid white;
  }
`;
