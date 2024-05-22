'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';


interface PokedexListProps {
    pokedexNames: string[]
    username: string
    onLinkClick: () => void;
}

export default function PokedexList(props: PokedexListProps) {
    const { pokedexNames, username, onLinkClick } = props;

    return (
        <Box
            display='flex'
            flexDirection='column'
            rowGap='8px'
        >
            <Box
                display='flex'
                flexDirection='column'
                rowGap='8px'
                maxHeight='64vh'
                sx={{
                    overflowY: 'auto'
                }}
            >

            
            { pokedexNames.map((pokedexName) => {
                return (
                    <Link
                        key={pokedexName}
                        component={NextLink} 
                        href={`/user/${username}/dex/${pokedexName}`}
                        sx={{
                            textDecoration: 'none'
                        }}
                        onClick={onLinkClick}
                    >
                        <Box
                            p='8px'
                            pl='12px'
                            sx={{
                                '&:hover': {
                                    bgcolor: '#84a820'
                                }
                            }}
                        >
                            <Typography color='#f7ffe0' fontWeight='600' >
                                { pokedexName }
                            </Typography>
                        </Box>
                    </Link>
                )
            })}
            </Box>
            <Link 
                component={NextLink} 
                href={'/user/' + username + '/create-pokedex'}
                onClick={onLinkClick}
                sx={{
                    textDecoration: 'none'
                }}
            >
                <Box
                    bgcolor='white'
                    p='8px'
                    sx={{
                        '&:hover': {
                            bgcolor: '#dedede'
                        }
                    }}
                >
                    <Typography textAlign='center' fontWeight='600' >
                        + Add Pokédex
                    </Typography>
                </Box>
            </Link>
        </Box>
    )
}