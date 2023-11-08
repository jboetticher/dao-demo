import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// If you're using MUI v5, you can create a styled Grid component
const AppGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4), // This equals 2em based on the default theme spacing
}));

// Usage in your component
export default (props) => {
  return (
    <AppGrid container justifyContent="space-between" {...props} />
  );
};
