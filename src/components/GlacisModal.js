import React from 'react';
import { Modal, Box } from '@mui/material';
import { CardTitle } from '../StyledComponents';

export default function GlacisModal({ open, handleClose, children, title, sx }) {
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
        bgcolor: 'var(--green)',
        boxShadow: 24,
        p: 4,
        borderRadius: 1, // Adjust the border radius as needed
        ...sx
      }}>
        {/* Modal content goes here */}
        <CardTitle style={{ textAlign: 'center' }}>{title}</CardTitle>
        <div id="modal-description">
          {children}
        </div>
        {/* Close button or any other elements */}
      </Box>
    </Modal>
  );
}
