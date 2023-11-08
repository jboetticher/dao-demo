import React from 'react';
import Grid from '@mui/material/Grid';
import '../../styles/BigCardContainer.css';
import { useTheme } from '@mui/material/styles';

export default function BigCardContainer(props) {
    const theme = useTheme();
    
    return (
        <Grid
            md={6} sm={12} item container
            className="bigCardContainer"
            sx={{
                overflowY: 'auto',
                [theme.breakpoints.up('sm')]: {
                    maxHeight: 'calc(100vh - 132px)',
                },
            }}
            {...props}
        />
    );
};
