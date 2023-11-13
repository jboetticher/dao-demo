import React, { useEffect, useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  StyledButton
} from '../StyledComponents';
import Card from './container/Card';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, IconButton, TextField } from '@mui/material';
import "../styles/DAOCard.css";
import GlacisModal from './GlacisModal';

const DAOCard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  console.log('DAO Card:', props)

  return (
    <Grid item sm={12}>
      <Card>
        <IconButton
          sx={{
            position: 'absolute', top: 8, right: 8, color: 'white', ":hover": {
              color: 'var(--orange)'
            }
          }}
          onClick={handleOpen}
        >
          <SettingsIcon />
        </IconButton>
        <div className='daoCardTitleContainer'>
          <CardTitle style={{ textAlign: 'center', width: '100%', marginBottom: 0 }}>
            {props.chainName} DAO
          </CardTitle>
        </div>
        <div>
          <CardTable>
            <tbody>
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
              <CardRow>
                <CardCell>Quorum:</CardCell>
                <CardCell><CardCode>{props.quorum}</CardCode></CardCell>
              </CardRow>
            </tbody>
          </CardTable>
        </div>
      </Card>
      <GlacisModal open={openModal} handleClose={handleClose} title={props.chainName + ' DAO'}>
        <DAOModalContents {...props} />
      </GlacisModal>
    </Grid >
  );
};

function DAOModalContents(props) {

  const [localQuorum, setQuorum] = useState(1);

  const handleChange = (event) => {
    setQuorum(event.target.value);
  };

  return <CardTable>
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
      <CardRow>
        <CardCell>Quorum:</CardCell>
        <CardCell><CardCode>{props.quorum}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell><StyledButton>Set Quorum</StyledButton></CardCell>
        <CardCell>
          <TextField
            type="number"
            value={localQuorum}
            onChange={handleChange}
            variant="outlined"
            fullWidth 
            sx={{
              // Normal styles
              color: 'white',
              '& .MuiInputBase-input': {
                color: 'white', // Input text color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'var(--orange)', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--orange)', // Border color when focused
                },
              }
            }}
          />
        </CardCell>
      </CardRow>
    </tbody>
  </CardTable>;
}

export default DAOCard;