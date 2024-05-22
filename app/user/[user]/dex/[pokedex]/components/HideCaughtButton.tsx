'use client';

import * as React from 'react';

import { hideCaught, showCaught } from '@/redux/features/currentPokedexSlice';
import { useAppDispatch } from '@/redux/hooks';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function HideCaughtButton() {
    const [ hideCaughtLocal, setHideCaughtLocal ] = React.useState(false);

    const dispatch = useAppDispatch();

    function handleClick() {
        if(hideCaughtLocal) {
            dispatch(showCaught());
        }
        else {
            dispatch(hideCaught());
        }

        setHideCaughtLocal(!hideCaughtLocal);
    }

    return (
        <Box
            width='100%'
            display='flex'
            justifyContent='flex-end'
        >
            <Button 
                variant='contained' 
                onClick={handleClick}
                sx={{
                    bgcolor: hideCaughtLocal ? '#134fd1' : '#134fd1',
                    '&:hover': {
                        bgcolor: hideCaughtLocal ? '#1245b3' : '#1245b3'
                    },
                    borderRadius: '0',
                    fontWeight: '500'
                }}
                disableRipple
            >
                { hideCaughtLocal ?
                    'Show all'
                    :
                    'Hide caught'
                }
            </Button>
        </Box>  
    );
}