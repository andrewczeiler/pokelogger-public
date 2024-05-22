'use client';

import * as React from 'react';

import Image from 'next/image';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { PokemonLocation } from '@/types/Location';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Locations from './Locations';
import CloseIcon from '@mui/icons-material/Close';


interface LocationModalProps {
    pokemon: string
    game: string
    imageUrl: string
    number: number
    dlc: boolean
    setOpenModal: (open: boolean) => void
}

// Pass if the modal is open so that clicking when the modal is open does not affect Pokemon caught status
export default function LocationModal(props: LocationModalProps) {
    const { pokemon, game, imageUrl, number, dlc, setOpenModal } = props;
    const [ open, setOpen ] = React.useState(false);
    const [ locations, setLocations ] = React.useState<PokemonLocation[]>([]);

    async function handleModalOpen(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.stopPropagation();

        await fetch('/api/get-locations?pokemonName=' + pokemon + '&game=' + game + '&dlc=' + dlc)
            .then(res => res.json())
            .then(data => {
                setLocations(data.locations);
                setOpenModal(true);
                setOpen(true);
            })
            .catch();
    }

    function handleModalClose() {
        setOpenModal(false);
        setOpen(false);
    }

    return (
        <>
            <InfoIcon 
                sx={{
                    '&:hover': {
                        color: '#11408f'
                    },
                    fontSize: {
                        xs: '6vw',
                        sm: '4.8vw',
                        md: '2.4vw'
                    }
                }} 
                onClick={(e) => handleModalOpen(e)}
            />
            <Modal
                open={open}
                onClose={handleModalClose}
                disableAutoFocus
            >
                <Box
                    position='absolute'
                    bgcolor='#EBDCBC'
                    left='50%'
                    top='40%'
                    sx={{
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '4px',
                        width: {
                            xs: '300px',
                            sm: '480px'
                        }
                    }}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        sx={{
                            width: {
                                xs: '300px',
                                sm: '480px'
                            }
                        }}
                    >
                        <Box
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'
                            p='4px'
                            sx={{
                                flexDirection: {
                                    xs: 'column',
                                    sm: 'row'
                                },
                                alignItems: {
                                    xs: 'flex-start',
                                    sm: 'center'
                                }
                            }}
                        >
                            <Box
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                columnGap='8px'
                            >
                                <Image
                                    src={imageUrl}
                                    alt={pokemon}
                                    width={96}
                                    height={96}
                                    priority
                                />
                                <Typography fontSize='2rem' fontWeight='600' >
                                    { formatPokemonNames(pokemon) }
                                </Typography>
                            </Box>
                            <Typography 
                                fontSize='2rem' 
                                fontWeight='600' 
                                pr='48px' 
                                flexShrink={0}
                                sx={{
                                    pl: {
                                        xs: '32px',
                                        sm: '0'
                                    }
                                }}
                            >
                                { '#' + formatNumber(number) }
                            </Typography>
                        </Box>
                        <Divider />
                        <Locations locations={locations} />
                    </Box>
                    <Box
                        position='absolute'
                        top='6px'
                        right='6px'
                    >
                        <CloseIcon 
                            fontSize='medium' 
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={handleModalClose}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}


function firstLetterUppercase(word: string){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const nameExceptions = ['iron-valiant', 'roaring-moon', 'chi-yu', 'ting-lu', 'chien-pao', 'wo-chien', 'iron-thorns', 'iron-moth', 'iron-jugulis', 'iron-hands',
    'iron-bundle', 'iron-treads', 'sandy-shocks', 'slither-wing', 'flutter-mane', 'brute-bonnet', 'scream-tail', 'great-tusk', 'gouging-fire', 'raging-bolt',
    'iron-crown', 'iron-boulder'
]

const differentNames: any = {
    'mr-mime-galar': 'Mr. Mime (Galar)',
    'mr-mime': 'Mr. Mime',
    'mime-jr': 'Mime Jr.',
    'mr-rime': 'Mr. Rime',
    'porygon-z': 'Porygon-Z',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': 'Kommo-o',
    'type-null': 'Type: Null'
}

function formatPokemonNames(name: string){
    let ret = '';
    const names = name.split('-');
    if(nameExceptions.includes(name)){
        for(let i = 0; i < names.length; i++){
            const namePart = firstLetterUppercase(names[i]);
            ret += ' ' + namePart;
        }
    }
    else if(differentNames[name]){
        return differentNames[name]
    }
    else{
        if (names.length === 1){
            const name = firstLetterUppercase(names[0]);
            return name;
        }
        for(let i = 0; i < names.length; i++){
            const namePart = firstLetterUppercase(names[i]);
            if (i === 1){
                ret += ' (' + namePart
            }
            else{
                ret += ' ' + namePart;
            }
        }
        ret += ')'
    }
    return ret;
}

function formatNumber(num: number){
    if(num === -1){
        return 'N/A';
    }
    else if(num >= 10000 && num < 20000){
        return (num - 10000) + ' (IoA)';
    }
    else if(num >= 20000 && num < 30000){
        return (num - 20000) + ' (CT)';
    }
    else if(num >= 30000 && num < 40000){
        return (num - 30000) + ' (DA)';
    }
    else if(num >= 40000 && num < 50000){
        return (num - 40000) + ' (KIT)';
    }
    else if(num >= 50000 && num < 60000){
        return (num - 50000) + ' (BLB)';
    }

    return num;
}