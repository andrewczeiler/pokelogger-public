'use client';

import * as React from 'react';

import { PokemonLocation } from '@/types/Location';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface LocationsProps {
    locations: PokemonLocation[]
}

export default function Locations(props: LocationsProps) {
    const { locations } = props;

    return (
        <Box
            p='12px 24px 32px 24px'
            maxHeight='50vh'
            sx={{
                overflowY: 'auto'
            }}
        >
            { locations.map((location) => {
                return (
                    <Box
                        mt='12px'
                        key={ location.game }
                    >
                        <Typography variant='h5' fontWeight='600' >
                            { 'Pokémon ' + formatGameName(location.game) }
                        </Typography>
                        <ul
                            style={{
                                margin: '0',
                                paddingLeft: '20px'
                            }}
                        >
                            { location.locations.map((loc, i) => 
                                <li key={i} >
                                    <Typography>
                                        { loc }
                                    </Typography>
                                </li>
                            )}
                        </ul>    
                    </Box>
                );
            })}
        </Box>
    );
}

const locationNameFormat: any = {
    "scarletdlc": "Scarlet",
    "violetdlc": "Violet",
    "scarlet": "Scarlet", 
    "violet": "Violet", 
    "legendsarceus": "Legends: Arceus", 
    "brilliantdiamond": "Brilliant Diamond", 
    "shiningpearl": "Shining Pearl", 
    "sword": "Sword", 
    "shield": "Shield",
    "sworddlc": "Sword",
    "shielddlc": "Shield",
    "letsgopikachu": "Let's Go, Pikachu!",
    "letsgoeevee": "Let's Go, Eevee!",
    "ultrasun": "Ultra Sun",
    "ultramoon": "Ultra Moon",
    "sun": "Sun",
    "moon": "Moon",
    "omegaruby": "Omega Ruby",
    "alphasapphire": "Alpha Sapphire",
    "x": "X",
    "y": "Y",
    "black2": "Black 2",
    "white2": "White 2",
    "black": "Black",
    "white": "White",
    "heartgold": "HeartGold",
    "soulsilver": "SoulSilver",
    "platinum": "Platinum",
    "diamond": "Diamond",
    "pearl": "Pearl",
    "emerald": "Emerald",
    "firered": "FireRed",
    "leafgreen": "LeafGreen",
    "ruby": "Ruby",
    "sapphire": "Sapphire",
    "crystal": "Crystal",
    "gold": "Gold",
    "silver": "Silver",
    "yellow": "Yellow",
    "red": "Red",
    "blue": "Blue"
}

function formatGameName(name: string){
    for (const key of Object.keys(locationNameFormat)) {
        if(name === key) return locationNameFormat[name];
    }

    return 'Game';
}