'use client';

import * as React from 'react';

import Box from '@/components/ServerComponents/Box';
import HideCaughtButton from './components/HideCaughtButton';
import PokedexHeader from './components/PokedexHeader/PokedexHeader';
import ProgressBar from './components/PokedexHeader/ProgressBar';
import SearchBar from './components/PokedexHeader/SearchBar';
import { Pokedex } from '@/types/Pokedex';
import PokemonBoxHandler from './components/PokemonHolder/PokemonBoxHandler';
import { setPokedex } from '@/redux/features/currentPokedexSlice';
import { useAppDispatch } from '@/redux/hooks';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


interface PokedexPageParams {
    params: {
        user: string
        pokedex: string
    }
}

// Getting the Pokedex will be based on the users username (table 2) and their pokedex name
export default function PokedexPage(params: PokedexPageParams){
    const user = params.params.user;
    const pokedex = params.params.pokedex;

    const [ currentPokedex, setCurrentPokedex ] = React.useState<Pokedex>();
    const [ error, setError ] = React.useState(false);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        fetch('/api/get-pokedex?user=' + user + '&pokedexName=' + pokedex)
            .then((res) => res.json())
            .then((data) => {
                setCurrentPokedex(data.pokedex);
                dispatch(setPokedex(data.pokedex));
            })
            .catch(e => {
                setError(true);
            })
    }, [user, pokedex, dispatch])


    // If there is an error, display that
    if(error) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                p='32px'
            >
                <Typography fontSize='2rem' fontWeight='600'>
                    Sorry, we cannot find the Pokédex you are looking for.
                </Typography>
            </Box>
        )
    }

    // Make an error page or redirect or something for when a pokedex is not present
    if(!currentPokedex) {
        return (
            <Box
                width='100%'
                height='80vh'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                rowGap='12px'
            >
                <Typography>
                    Loading...
                </Typography>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box 
            width='100%' 
            p='64px 0 32px 0' 
            display='flex'
            flexDirection='column'
            alignItems='center'
        >
            <Box
                width='72%'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                rowGap='32px'
            >
                <PokedexHeader 
                    name={currentPokedex.name} 
                    shiny={currentPokedex.shiny} 
                    game={currentPokedex.game} 
                    dlc={currentPokedex.dlc}
                    username={user} 
                />
                <SearchBar />
                <ProgressBar />
                <HideCaughtButton />
                <PokemonBoxHandler shiny={currentPokedex.shiny} />
            </Box>     
        </Box>
    )
}