'use client';

import { useAppSelector } from '@/redux/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function ProgressBar() {
    const totalCaught = useAppSelector(state => state.currentPokedex.totalCaught);
    const numPokemon = useAppSelector(state => state.currentPokedex.numPokemon);

    const caughtPercentage = totalCaught/numPokemon * 100;

    let caughtString = totalCaught + '/' + numPokemon + ' caught ' + '(' + caughtPercentage.toFixed(2) + '%)';


    return (
        <Box
            width='100%'
            position='relative'
            height='36px'
            bgcolor='lightgrey'
            border='solid black 1px'
            display='flex'
            alignItems='center'
        >
            <Typography fontSize='20px' fontWeight='600' pl='8px' sx={{ whiteSpace: 'no-wrap'}} zIndex='1' >
                { caughtString }
            </Typography>
            <Box
                bgcolor='gray'
                position='absolute'
                width={`${caughtPercentage}%`}
                height='34px'
                left='0'
            />
            
        </Box>
    );
}