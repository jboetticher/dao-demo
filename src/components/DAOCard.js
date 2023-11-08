import React, { useEffect, useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  BigCard
} from '../StyledComponents';
import Card from './container/Card';
import { Grid } from '@mui/material';

const DAOCard = (props) => {
  return (
    <Grid item sm={12}>
      <Card>
        <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
          <CardTitle style={{ textAlign: 'center', width: '100%', marginBottom: 0 }}>
            {props.chainName} DAO
          </CardTitle>
        </div>
        <div>
          <CardTable>
            <tbody>
              <CardRow>
                <CardCell>Address:</CardCell>
                <CardCell><CardCode>{props.address}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Members:</CardCell>
                <CardCell><CardCode>{props.members}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Config Text:</CardCell>
                <CardCell><CardCode>{props.configText}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Config Version:</CardCell>
                <CardCell><CardCode>{props.configVersion}</CardCode></CardCell>
              </CardRow>
            </tbody>
          </CardTable>
        </div>
      </Card>
    </Grid>
  );
};

export default DAOCard;
