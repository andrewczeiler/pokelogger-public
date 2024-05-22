'use client';

import * as React from 'react';

import { Pokedex } from '@/types/Pokedex';
import { setPokedex } from '@/redux/features/currentPokedexSlice';
import { useAppDispatch } from '@/redux/hooks';
import PokemonBoxHandler from './PokemonBoxHandler';


interface PokemonHolderProps {
    pokedex: Pokedex
}

export default function PokemonHolder(props: PokemonHolderProps) {
    const { pokedex } = props;

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setPokedex(pokedex));
    }, [dispatch, pokedex]);

    return (
        <PokemonBoxHandler shiny={pokedex.shiny} />
    );
}