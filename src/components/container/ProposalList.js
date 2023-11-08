import React from 'react';
import Grid from '@mui/material/Grid';
import '../../styles/ProposalList.css';

export default function ProposalList(props) {
    return (
        <Grid md={6} sm={12} item container className="proposalList" {...props} />
    );
};
