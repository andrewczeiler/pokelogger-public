'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import PokemonBox from './PokemonBox';
import { Pokemon } from '@/types/Pokemon';
import { useAppSelector } from '@/redux/hooks';


interface PokemonForms {
    form: string
    pokemon: Pokemon[]
}

interface PokemonBoxHandlerProps {
    shiny: boolean
}

export default function PokemonBoxHandler(props: PokemonBoxHandlerProps) {
    const { shiny } = props;

    const pokemon = useAppSelector(state => state.currentPokedex.viewPokemon);

    const pokemonBoxes = React.useMemo(() => {
        // Get all of the different forms of Pokemon
        const forms: string[] = [];
        for (const poke of pokemon) {
            if(!forms.includes(poke.form)) forms.push(poke.form);
        }

        // Get arrays of each type of Pokemon form
        const pokemonForms: PokemonForms[] = [];
        for (const form of forms) {
            pokemonForms.push({
                form,
                pokemon: pokemon.filter(poke => poke.form === form)
            })
        }

        // Make boxes of Pokemon, separated by the forms
        const pokemonBoxes: Pokemon[][] = [];
        for (const pokemonForm of pokemonForms) {
            const boxCount = pokemonForm.pokemon.length / 30;

            // Sort Pokemon so they do not get shuffled around
            const pokemons = pokemonForm.pokemon.sort((a, b) => a.number - b.number);
            for (let i = 0; i < boxCount; i++) {
                pokemonBoxes.push(pokemons.slice(i * 30, (i + 1) * 30));
            }
        }

        return pokemonBoxes;
    }, [pokemon])
    
    

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            justifyContent='center'
            alignItems='center'
            rowGap='32px'
            m='32px 0 32px 0'
        >
            { pokemonBoxes.map((pokemonBox, i) => {
                return (
                    <PokemonBox
                        key={i}
                        pokemon={pokemonBox}
                        shiny={shiny}
                    />
                )
            })}
        </Box>
    );
}