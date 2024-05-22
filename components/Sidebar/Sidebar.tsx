'use client';

import * as React from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { signOut } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import PokedexList from './PokedexList';
import SidebarToggle from '../SidebarToggle';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


const drawerWidth = '280px';

interface SidebarProps {
    pokedexNames: string[]
    username: string
}

export default function Sidebar(props: SidebarProps) {
    const { pokedexNames, username } = props;
    const [ open, setOpen ] = React.useState(true);

    const fullScreen = useMediaQuery('(max-width:900px)');

    const { data: session } = useSession();

    function onLinkClick() {
        if(fullScreen) setOpen(false);
    }

    function handleLogout() {
        signOut({
            redirect: true,
            callbackUrl: '/login'
        }); 
    }

    return (
        <>
            <Drawer 
                open={open} 
                hidden={!open}
                variant='persistent' 
                anchor='left' 
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { 
                        borderWidth: 0 
                    }
                }}
                transitionDuration={0}
            >
                <Box 
                    bgcolor='#74941C'
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    sx={{
                        width: {
                            xs: '100vw',
                            md: drawerWidth
                        }
                    }}
                    height='100%'
                    p='20px'
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Box
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            columnGap='8px'
                        >
                            <Typography variant='h5' fontWeight='600' >
                                PokéLogger
                            </Typography>
                            <Image
                                src='/pokeball.png'
                                alt='Pokéball image'
                                width={48}
                                height={48}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: {
                                    xs: 'inherit',
                                    md: 'none'
                                },
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            pr='8px'
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </Box>
                    </Box>
                    <PokedexList pokedexNames={pokedexNames} username={username} onLinkClick={onLinkClick} />
                    { session ?
                        <LogoutIcon 
                            onClick={handleLogout} 
                            fontSize='large' 
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }} 
                        />
                        :
                        <div></div>
                    }
                </Box>
            </Drawer>
            <SidebarToggle open={open} setOpen={() => setOpen(!open)} />
        </>
    );
}