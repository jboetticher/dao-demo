import styled from 'styled-components';
import { BigCard, CardTitle } from '../StyledComponents';
import { useState } from 'react';

export default () => {
    const handleChainChange = (event) => {
        const selectedChain = event.target.value;
        console.log(`Selected chain: ${selectedChain}`);
    };

    return (
        <BigCard>
            <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
            <RadioContainer>
                <StyledInput id="fantom" type="radio" name="chain" value="fantom" onChange={handleChainChange} />
                <StyledLabel htmlFor="fantom">Fantom</StyledLabel>

                <StyledInput id="avalanche" type="radio" name="chain" value="avalanche" onChange={handleChainChange} />
                <StyledLabel htmlFor="avalanche">Avalanche</StyledLabel>

                <StyledInput id="moonbase" type="radio" name="chain" value="moonbase" onChange={handleChainChange} />
                <StyledLabel htmlFor="moonbase">Moonbase</StyledLabel>
            </RadioContainer>
        </BigCard>
    )
}


export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 1em;

  & > * {
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
    background: magenta;
    border: 2px solid white;
  }
`;