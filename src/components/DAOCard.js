import React, { useEffect, useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  BigCard
} from '../StyledComponents';

const DAOCard = (props) => {
  return (
    <BigCard>
      <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
        <CardTitle style={{ textAlign: 'center', width: '100%', marginBottom: 0 }}>
          {props.chainName} DAO
        </CardTitle>
      </div>
      <div>
        <CardTable>
          <CardRow>
            <CardCell>Address:</CardCell>
            <CardCell><CardCode>{props.address}</CardCode></CardCell>
          </CardRow>
          {/* <CardRow>
            <CardCell>Proposals:</CardCell>
            <CardCell><CardCode>{props.proposals}</CardCode></CardCell>
          </CardRow> */}
          <CardRow>
            <CardCell>Members:</CardCell>
            <CardCell><CardCode>{props.members}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Config Text:</CardCell>
            <CardCell><CardCode>{props.configText}</CardCode></CardCell>
          </CardRow>
        </CardTable>
      </div>
    </BigCard>
  );
};

export default DAOCard;
