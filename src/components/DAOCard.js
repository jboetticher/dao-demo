import React, { useEffect, useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  BigCard
} from '../StyledComponents';
import { readContract } from '@wagmi/core';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

const DAOCard = (props) => {
  const [proposalNum, setProposalNum] = useState(-1);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await readContract({
      address: props.address,
      abi: GlacisSampleDAOABI,
      functionName: 'nextProposal',
    });
    console.log(data);
    setProposalNum(data);
  }

  console.log(props);

  return (
    <BigCard>
      <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
        <CardTitle style={{ textAlign: 'center', width: '100%', marginBottom: 0 }}>
          {props.chain.name} DAO
        </CardTitle>
      </div>
      <div>
        <CardTable>
          <CardRow>
            <CardCell>Address:</CardCell>
            <CardCell><CardCode>{props.address}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Proposals:</CardCell>
            <CardCell><CardCode>{props.proposals}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Members:</CardCell>
            <CardCell><CardCode>{props.members}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Config Number:</CardCell>
            <CardCell><CardCode>{props.configNumber}</CardCode></CardCell>
          </CardRow>
        </CardTable>
      </div>
    </BigCard>
  );
};

export default DAOCard;
