import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from '../../Navbar';
import AccessoryCard from './AccessoryCard';

const Accessories = () => {
    return (
        <>
        <Navbar/>
        <Grid container spacing={2}  columns={2}>
        <AccessoryCard/>
        </Grid>
           
       
        </>
    )
}

export default Accessories;