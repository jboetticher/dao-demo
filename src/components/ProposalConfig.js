import styled from 'styled-components';
import { BigCard, CardTitle } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useState } from 'react';

export default () => {

  const glacisOptions = ["Redundancy", "Access Control", "Retries"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole"];
  const chainOptions = ["Moonbeam", "Avalanche"];

  const handleGlacisOptions = (selections) => {
    console.log("Updated selections:", selections);
  };

  const handleGMPOptions = (selections) => {
    console.log("Updated selections:", selections);
  }

  const handleChainChange = (event) => {
    const selectedChain = event.target.value;
    console.log(`Selected chain: ${selectedChain}`);
  };

  return (
    <BigCard>
      <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
      <ConfigContainer>
        <ConfigContainerTitle>Features</ConfigContainerTitle>
        <ConfigContainerTitle>GMPs</ConfigContainerTitle>
        <ConfigContainerTitle>Chains</ConfigContainerTitle>
      </ConfigContainer>
      <ConfigContainer>
        <Checklist options={glacisOptions} onChange={handleGlacisOptions} />
        <Checklist options={gmpOptions} onChange={handleGMPOptions} />
        <RadioGroup options={chainOptions} name="chain" onChange={handleChainChange} />
      </ConfigContainer>
    </BigCard>
  )
}

export const ConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const ConfigContainerTitle = styled.h3`
  width: 50%;
`;
