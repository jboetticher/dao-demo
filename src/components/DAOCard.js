import React, { useEffect, useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode
} from '../StyledComponents';
import Card from './container/Card';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, IconButton, Modal, Box } from '@mui/material';
import "../styles/DAOCard.css";

const DAOCard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);


  return (
    <Grid item sm={12}>
      <Card>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white', ":hover": {
            color: 'var(--orange)'
          } }}
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
      <DAOModal open={openModal} handleClose={handleClose} />
    </Grid >
  );
};

function DAOModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="dao-modal-title"
      aria-describedby="dao-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, // Adjust the size as needed
        bgcolor: 'var(--green)',
        boxShadow: 24,
        p: 4,
        borderRadius: 1, // Adjust the border radius as needed
      }}>
        {/* Modal content goes here */}
        <h2 id="dao-modal-title">DAO Settings</h2>
        <p id="dao-modal-description">
          {/* Settings content */}
        </p>
        {/* Close button or any other elements */}
      </Box>
    </Modal>
  );
}

export default DAOCard;
