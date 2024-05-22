'use client';

import * as React from 'react';

import { Pokemon } from '@/types/Pokemon';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PokemonCard from './Pokemon';
import Button from '@mui/material/Button';


interface PokemonBoxProps {
    pokemon: Pokemon[]
    shiny: boolean
}

export default function PokemonBox(props: PokemonBoxProps) {
    const { pokemon, shiny } = props;

    function firstLetterUppercase(text: string){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function splitDashAndUppercase(text: string){
        if(!text){
            return ''
        }
        let ret = '';
        const names = text.split('-');
        for(let i = 0; i < names.length; i++){
            const namePart = firstLetterUppercase(names[i]);
            ret += ' ' + namePart;
        }
        return ret;
    }

    let boxHeaderText;
    const boxType = pokemon[0].form;
    if(boxType == 'normal'){
        const pokeNum1 = pokemon[0].number;
        const pokeNum2 = pokemon[pokemon.length-1].number;
        if(pokeNum1 === pokeNum2){
            boxHeaderText = pokeNum1;
        }
        else {
            boxHeaderText = pokeNum1 + ' - ' + pokeNum2;
        }
    }
    else{
        boxHeaderText = splitDashAndUppercase(boxType);
    }

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={12}
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                mb='8px'
                columnGap='16px'
            >
                <Box
                    bgcolor='#98a197'
                    width='60%'
                    p='4px'
                    border='solid black 2px'
                    borderRadius='4px'
                >
                    <Typography variant='h5' fontWeight='700' textAlign='center'>
                        { boxHeaderText }
                    </Typography>
                </Box>
            </Grid>
            { pokemon.map((poke, i) => {
                return (
                    <Grid
                        item
                        xs={4}
                        sm={3}
                        md={2}
                        key={i}
                    >
                        <PokemonCard id={poke.id} shiny={shiny} priority={i <= 2} />
                    </Grid>
                )
            })}
        </Grid>
    );
}