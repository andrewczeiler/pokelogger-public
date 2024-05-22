'use client';

import * as React from 'react';

import { Pokemon } from '@/types/Pokemon';
import Box from '@mui/material/Box';
import { nationalIds } from '@/lib/nationalIds';
import Image from 'next/image';
import { getPokemonData, setCaught } from '@/redux/features/currentPokedexSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { PokemonCaught } from '@/types/PokemonCaught';
import LocationModal from './LocationModal';


interface PokemonProps {
    id: number
    shiny: boolean
    priority: boolean
}

export default function PokemonComponent(props: PokemonProps) {
    const { id, shiny, priority } = props;
    const [ loading, setLoading ] = React.useState(false);
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ showIcon, setShowIcon ] = React.useState(false);

    const dispatch = useAppDispatch();

    const pokemon = useAppSelector(state => getPokemonData(state, { payload: id }));
    const game = useAppSelector(state => state.currentPokedex.pokedex.game);
    const dlc = useAppSelector(state => state.currentPokedex.pokedex.dlc)

    if(!pokemon) return null;

    async function handleCaught() {
        if(loading || openModal) return;

        setLoading(true);

        const pokemonCaught: PokemonCaught = {
            id: pokemon.id,
            caught: !pokemon.caught
        }
        await fetch('/api/caught', {
            method: 'POST',
            body: JSON.stringify(pokemonCaught)
        })
            .then((response) => response.json())
            .then((body) => {
                if(body.status === 'fail') throw {message: body.message};
                dispatch(setCaught(pokemon.id));
            })
            .catch(() => setLoading(false));

        setLoading(false);
    }

    function handleModalOpen(open: boolean) {
        setOpenModal(open);
        if(open) setShowIcon(false);
    }

    let cardColor = '#95de5f';
    if(loading) cardColor = '#5d9632';
    else if(pokemon?.caught) cardColor = '#507634';

    const imageUrl = getImageUrl(pokemon.name, shiny);

    return (
        <>
            <Box
                position='relative'
                bgcolor={cardColor}
                width='100%'
                borderRadius='8px'
                boxShadow='0px 0px 3px 0px'
                sx={{
                    aspectRatio: '1',
                    '&:hover': {
                        cursor: 'pointer',
                        boxShadow: '0px 0px 10px 0px black'
                    }
                }}
                onClick={handleCaught}
                onMouseEnter={() => setShowIcon(true)}
                onMouseLeave={() => setShowIcon(false)}
            >
                <Box
                    position='relative'
                    width='100%'
                    sx={{
                        aspectRatio: '1',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt={pokemon.name}
                        priority={priority}
                        sizes='(max-width: 900px) 33vw, 16vw'
                        fill
                        unoptimized
                    />
                </Box>
                <Box
                    position='absolute'
                    left='0.4vw'
                    bottom='0.2vw'
                    display={showIcon ? 'inherit' : 'none'}
                >
                    <LocationModal 
                        pokemon={pokemon.name} 
                        setOpenModal={handleModalOpen} 
                        game={game} 
                        imageUrl={imageUrl} 
                        number={pokemon.number}
                        dlc={dlc}
                    />
                </Box>
            </Box>
        </>
    );
}


function getImageUrl(pokemonName: string, shiny: boolean) {
    const nationalId: string = nationalIds[pokemonName];

    let imgUrl;
    if(shiny){
        let multiPart = nationalId.split('-')
        if(parseInt(multiPart[0]) <= 1024) imgUrl = '/pokemon/shiny/' + nationalId + '.png';
        else if(parseInt(multiPart[0]) >= 1009) imgUrl = '/pokemon/' + nationalId + '.png';
        else imgUrl = '/pokemon/other/official-artwork/shiny/' + nationalId + '.png';
    }
    else imgUrl = '/pokemon/' + nationalId + '.png'

    return imgUrl;
}