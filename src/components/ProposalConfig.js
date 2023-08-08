import styled from 'styled-components';
import { BigCard, CardTitle } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useState } from 'react';

export default () => {

  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});

  const glacisOptions = ["Redundancy", "Retries"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole"];
  const chainOptions = ["Moonbeam", "Avalanche"];

  const handleGlacisOptions = (selections) => { setGlacis(selections) };
  const handleGMPOptions = (selections) => { setGMPs(selections) };
  const handleChainChange = (selections) => { setChains(selections) };

  console.log("STATE:", glacis, gmps, chains);

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
        {glacis?.Redundancy ?
          <Checklist options={gmpOptions} onChange={(x) => handleGMPOptions([x])} /> :
          <RadioGroup options={gmpOptions} name="gmps" onChange={handleGMPOptions} />
        }
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
