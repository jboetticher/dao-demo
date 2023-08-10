import React, { useEffect, useState } from 'react';
import {
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

    return (
        <BigCard>
            <div>
                {props.chain.name}
            </div>
            <div>
                {proposalNum.toString()}
            </div>
        </BigCard>
    );
};

export default DAOCard;
